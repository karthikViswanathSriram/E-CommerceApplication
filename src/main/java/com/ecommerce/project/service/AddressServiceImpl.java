package com.ecommerce.project.service;

import com.ecommerce.project.exceptions.ResourceNotFoundException;
import com.ecommerce.project.model.Address;
import com.ecommerce.project.model.User;
import com.ecommerce.project.payload.AddressDTO;
import com.ecommerce.project.repository.AddressRepository;
import com.ecommerce.project.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class AddressServiceImpl implements AddressService {
    @Autowired
    ModelMapper modelMapper;
    @Autowired
    AddressRepository addressRepository;
    @Autowired
    UserRepository userRepository;

    @Override
    public AddressDTO createAddress(AddressDTO addressDTO, User user) {
        Address address = modelMapper.map(addressDTO,Address.class);
        List<Address> addressList = user.getAddresses();
        addressList.add(address);
        user.setAddresses(addressList);
        address.setUser(user);

        Address savedAddress = addressRepository.save(address);

        return modelMapper.map(savedAddress, AddressDTO.class);
    }

    @Override
    public List<AddressDTO> getAddresses() {
        return addressRepository.findAll()
                .stream().map(
                        address->modelMapper.map(address,AddressDTO.class)
                ).toList();
    }

    @Override
    public AddressDTO getAddressById(Long addressId) {
        Address address = addressRepository.findById(addressId)
                .orElseThrow(()->new ResourceNotFoundException("Address", "id", addressId));
        return modelMapper.map(address, AddressDTO.class);
    }

    @Override
    public List<AddressDTO> getAddressesForUser(User user) {

        return user.getAddresses()
                .stream().map(
                        address->modelMapper.map(address,AddressDTO.class)
                ).toList();
    }

    @Override
    public AddressDTO updateAddressById(Long addressId, AddressDTO addressDTO) {
        Address existingAddress = addressRepository.findById(addressId)
                .orElseThrow(()->new ResourceNotFoundException("Address", "id", addressId));

        existingAddress.setStreet(addressDTO.getStreet());
        existingAddress.setBuildingName(addressDTO.getBuildingName());
        existingAddress.setCity(addressDTO.getCity());
        existingAddress.setState(addressDTO.getState());
        existingAddress.setCountry(addressDTO.getCountry());
        existingAddress.setPincode(addressDTO.getPincode());

        Address  savedAddress = addressRepository.save(existingAddress);

        User user = existingAddress.getUser();
        user.getAddresses().removeIf(address->address.getAddressId().equals(addressId));
        user.getAddresses().add(savedAddress);
        userRepository.save(user);
        return modelMapper.map(savedAddress,AddressDTO.class);
    }

    @Override
    public String deleteAddressById(Long addressId) {
        Address existingAddress = addressRepository.findById(addressId)
                .orElseThrow(()->new ResourceNotFoundException("Address", "id", addressId));

        User user = existingAddress.getUser();
        user.getAddresses().removeIf(address->address.getAddressId().equals(addressId));
        addressRepository.delete(existingAddress);
        return "Address deleted successfully with id: " + addressId;
    }
}
