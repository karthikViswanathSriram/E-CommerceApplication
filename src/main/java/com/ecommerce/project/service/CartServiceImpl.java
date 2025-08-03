package com.ecommerce.project.service;

import com.ecommerce.project.exceptions.APIException;
import com.ecommerce.project.exceptions.ResourceNotFoundException;
import com.ecommerce.project.model.Cart;
import com.ecommerce.project.model.CartItem;
import com.ecommerce.project.model.Product;
import com.ecommerce.project.payload.CartDTO;
import com.ecommerce.project.payload.CartItemDTO;
import com.ecommerce.project.payload.ProductDTO;
import com.ecommerce.project.repository.CartItemRepository;
import com.ecommerce.project.repository.CartRepository;
import com.ecommerce.project.repository.ProductRepository;
import com.ecommerce.project.util.AuthUtil;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Stream;

@Service
public class CartServiceImpl implements  CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    AuthUtil authUtil;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public CartDTO addProductToCart(Long productId, Integer quantity) {
        Cart cart = createCart();
        Product product = productRepository.findById(productId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product", "id", productId));

        CartItem cartItem = cartItemRepository.findCartItemByProductIdAndCartId(
                cart.getCartId(),
                productId
        );
        if(cartItem!=null){
            throw new APIException("Product "+product.getProductName()+" already added to Cart");
        }
        if(product.getQuantity()==0){
            throw new APIException("Product "+product.getProductName()+" not available");
        }
        if(product.getQuantity()<quantity){
            throw new APIException("Please make an order of the "+product.getProductName()+
                    "less than or equal to the quantity "+product.getQuantity());
        }
        CartItem newCartItem = new CartItem();
        newCartItem.setProduct(product);
        newCartItem.setCart(cart);
        newCartItem.setQuantity(quantity);
        newCartItem.setDiscount(product.getDiscount());
        newCartItem.setProductPrice(product.getSpecialPrice());

        cartItemRepository.save(newCartItem);

        product.setQuantity(product.getQuantity());

        cart.setTotalPrice(cart.getTotalPrice() + (product.getSpecialPrice()*quantity));
        cartRepository.save(cart);

        CartDTO cartDto = modelMapper.map(cart, CartDTO.class);

        List<CartItem> cartItems = cart.getCartItems();
        Stream<ProductDTO> productDTOStream =  cartItems.stream().map(
                item->{
                    ProductDTO productDTO = modelMapper.map(item.getProduct(), ProductDTO.class);
                    productDTO.setQuantity(item.getQuantity());
                    return productDTO;
                });
        cartDto.setProducts(productDTOStream.toList());

        return cartDto;
    }

    @Override
    public List<CartDTO> getALlCarts() {
        List<Cart> carts = cartRepository.findAll();
        if(carts.size()==0){
            throw new APIException("No carts found");
        }
        List<CartDTO> cartDTOs = carts.stream().map(
                cart->{
                    CartDTO cartDTO = modelMapper.map(cart, CartDTO.class);
                    List<ProductDTO> products = cart.getCartItems().stream()
                            .map(cartItem->{
                                        cartItem.getProduct().setQuantity(cartItem.getQuantity());
                                        return modelMapper.map(cartItem.getProduct(), ProductDTO.class);
                                }).toList();
                    cartDTO.setProducts(products);
                    return cartDTO;
                }).toList();

        return cartDTOs;
    }

    @Override
    public CartDTO getCart(String emailId) {
        Cart cart = cartRepository.findCartByEmailId(emailId);
        if(cart==null){
            throw new ResourceNotFoundException("Cart","emailId",emailId);
        }
        CartDTO cartDTO = modelMapper.map(cart, CartDTO.class);
        cart.getCartItems().forEach(c->c.getProduct().setQuantity(c.getQuantity()));
        List<ProductDTO> products = cart.getCartItems().stream()
                .map(cartItem->modelMapper.map(cartItem.getProduct(), ProductDTO.class))
                .toList();
        cartDTO.setProducts(products);
        return cartDTO;
    }

    @Transactional
    @Override
    public CartDTO updateProductQuantityInCart(Long productId, Integer quantity) {
        String emailId = authUtil.loggedInEmail();
        Cart userCart = cartRepository.findCartByEmailId(emailId);
        Long cartId = userCart.getCartId();

        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(()->new ResourceNotFoundException("Cart","cartId",cartId));

        Product product = productRepository.findById(productId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product", "id", productId));

        if(product.getQuantity()==0){
            throw new APIException("Product "+product.getProductName()+" not available");
        }
        if(product.getQuantity()<quantity){
            throw new APIException("Please make an order of the "+product.getProductName()+
                    "less than or equal to the quantity "+product.getQuantity());
        }

        CartItem cartItem = cartItemRepository.findCartItemByProductIdAndCartId(cartId,productId);
        if(cartItem==null){
            throw new APIException("Product "+product.getProductName()+" not available");
        }
        int newQuantity = cartItem.getQuantity()+quantity;
        if(newQuantity < 0)
            throw new APIException("Resulting quantity cannot be negative");
        if(newQuantity == 0)
            deleteProductFromCart(cartId,productId);
        else {
            cartItem.setProductPrice(product.getSpecialPrice());
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
            cartItem.setDiscount(product.getDiscount());
            cart.setTotalPrice(cart.getTotalPrice() + (cartItem.getProductPrice() * quantity));
            cartRepository.save(cart);
        }

        CartItem updatedItem = cartItemRepository.save(cartItem);
        if(updatedItem.getQuantity()==0){
            cartItemRepository.deleteById(updatedItem.getCartItemId());
        }
        CartDTO cartDto = modelMapper.map(cart, CartDTO.class);
        List<CartItem> cartItems = cart.getCartItems();
        Stream<ProductDTO> productStream =  cartItems.stream().map(item->{
            ProductDTO productDTO = modelMapper.map(item.getProduct(), ProductDTO.class);
            productDTO.setQuantity(item.getQuantity());
            return productDTO;
        });

        cartDto.setProducts(productStream.toList());

        return cartDto;
    }

    @Transactional
    @Override
    public String deleteProductFromCart(Long cartId, Long productId) {

        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(()->new ResourceNotFoundException("Cart","cartId",cartId));
        CartItem cartItem = cartItemRepository.findCartItemByProductIdAndCartId(cartId,productId);

        if(cartItem==null){
            throw new ResourceNotFoundException("Product","ProductId",productId);
        }
        cart.setTotalPrice(cart.getTotalPrice() -
                (cartItem.getProductPrice() * cartItem.getQuantity()));

        cartItemRepository.deleteCartItemByProductIdAndCartId(cartId,productId);

        return "Product "+cartItem.getProduct().getProductName()+" removed";
    }

    @Override
    public void updateProductInCarts(Long cartId, Long productId) {
        Cart cart = cartRepository.findById(cartId)
                .orElseThrow(()->new ResourceNotFoundException("Cart","cartId",cartId));

        Product product = productRepository.findById(productId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product", "id", productId));

        CartItem cartItem = cartItemRepository.findCartItemByProductIdAndCartId(cartId,productId);

        if(cartItem == null)
            throw new APIException("Product "+product.getProductName()+" not available in cart");

        double cartPrice = cart.getTotalPrice() -
                (cartItem.getProductPrice() * cartItem.getQuantity());
        cartItem.setProductPrice(product.getSpecialPrice());
        cart.setTotalPrice(cartPrice +
                (cartItem.getProductPrice() * cartItem.getQuantity()));
        cartItem =  cartItemRepository.save(cartItem);


    }

    @Transactional
    @Override
    public String createOrUpdateCartWithItems(List<CartItemDTO> cartItems) {
        String emailId = authUtil.loggedInEmail();

        Cart existingCart = cartRepository.findCartByEmailId(emailId);
        if(existingCart == null){
            existingCart = new Cart();
            existingCart.setTotalPrice(0.0);
            existingCart.setUser(authUtil.loggedInUser());
            existingCart =cartRepository.save(existingCart);
        } else {
            // clear all items in existing cart
            cartItemRepository.deleteAllByCartId(existingCart.getCartId());
        }
        Double totalPrice = 0.00;
        for(CartItemDTO cartItemDto: cartItems){
            Long productId = cartItemDto.getProductId();
            Integer quantity = cartItemDto.getQuantity();
            Product product = productRepository.findById(productId)
                    .orElseThrow(()->new ResourceNotFoundException("Product","productId",productId));
//            product.setQuantity(product.getQuantity() - quantity);
            totalPrice += product.getSpecialPrice() * quantity;

            CartItem cartItem= new CartItem();
            cartItem.setProduct(product);
            cartItem.setCart(existingCart);
            cartItem.setQuantity(quantity);
            cartItem.setProductPrice(product.getSpecialPrice());
            cartItem.setDiscount(product.getDiscount());
            cartItemRepository.save(cartItem);
        }
        existingCart.setTotalPrice(totalPrice);
        cartRepository.save(existingCart);
        return "Cart created/updated with new items successfully";
    }

    private Cart createCart(){
        Cart userCart= cartRepository.findCartByEmailId(authUtil.loggedInEmail());
        if(userCart != null){
            return userCart;
        }
        Cart cart= new Cart();
        cart.setTotalPrice(0.0);
        cart.setUser(authUtil.loggedInUser());
        return cartRepository.save(cart);
    }
}
