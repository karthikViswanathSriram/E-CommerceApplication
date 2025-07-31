import { CircularProgress } from "@mui/material"

export const ButtonLoader = () => {
  return (
    <div className="flex gap-2">
        <CircularProgress size={25}
        sx={{color:'white'}}/>
        <span className="text-white">Please wait...</span>
    </div>
  )
}
