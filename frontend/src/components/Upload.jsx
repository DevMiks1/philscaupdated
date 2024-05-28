/** @format */

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useAuth } from "./context/Auth";

export const Upload = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [suffix, setSuffix] = useState("");
  const [lastname, setLastname] = useState("");
 
  const auth = useAuth();

  const navigate = useNavigate();
  const toast = useToast();
  const globalUrl = process.env.REACT_APP_GLOBAL_URL;

  const uploadFiles = async () => {
    setLoading(true);

    try {
      let cloudName = "dijhxviqe";
      for (const image of images) {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "uploadNews");
        const api = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

        const res = await axios.post(api, data);
        const secure_url = res.data.secure_url;
        auth.user.picture = secure_url;
        await fetchUploadImage(secure_url);
      }

      setLoading(false);

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);

      console.log("Files upload success");
    } catch (error) {
      console.error("Upload failed:", error);
      setLoading(false);
    }
  };

  const fetchUploadImage = async (imageSecureUrl) => {
    const body = {
      affidavit: imageSecureUrl,
      firstname: firstname,
      lastname: lastname,
      suffix: suffix,
      
    };

    const userSignin = auth.user._id;

    try {
      let url = `${globalUrl}/accounts/update/${userSignin}`;
      let method = "PATCH";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": process.env.REACT_APP_X_AUTH_TOKEN,
        },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        auth.user.firstname = firstname;
        auth.user.lastname = lastname;
        auth.user.suffix = suffix;
        console.log("Data saved successfully");
      } else {
        console.log("Error saving data");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleSubmit = () => {
    if (images.length < 1) {
      toast({
        title: "Please Fill All the Fields",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
    } else {
      uploadFiles();
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files[0];
    setImages([selectedFiles]);
  };

  return (
    <section className="font-poppins">
      <Box>
        
          <FormControl>
            <FormLabel>Firstname</FormLabel>
            <Input
              name="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Suffix</FormLabel>
            <Input
              name="suffix"
              value={suffix}
              onChange={(e) => setSuffix(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Lastname</FormLabel>
            <Input
              name="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </FormControl>
  

      </Box>
      <div className="container mx-auto pt-10">
        <form className="">
          <div className="flex flex-col justify-center">
            <div className="md:col-span-4 h-full">
              <div className="flex flex-col justify-center items-center gap-3 p-5 border border-dashed border-black h-full w-[100%] dark:bg-white">
                {images.length > 0 ? (
                  <div
                    className="flex flex-col justify-center items-center gap-3 text-center h-[170px]"
                    style={{ wordWrap: "break-word", wordBreak: "break-word" }}
                  >
                    <img
                      className="mx-auto max-h-[150px]"
                      src={URL.createObjectURL(images[0])}
                      alt={images[0].name}
                    />
                    {images.map((image) => {
                      return <p key={image.name}>{image.name}</p>;
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col justify-center items-center">
                    <span className="text-[4rem]">
                      <i className="fa-solid fa-folder-open"></i>
                    </span>
                    <p className="font-semibold text-center">
                      Upload your image here
                    </p>
                  </div>
                )}

                <label htmlFor="actual-btn" className="custom-file-upload">
                  Choose Files
                  <input
                    type="file"
                    accept="image/*"
                    id="actual-btn"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>

            <Box textAlign="center">
              <Button
                colorScheme="blue"
                width="25%"
                style={{ marginTop: 15 }}
                onClick={handleSubmit}
                isLoading={loading}
              >
                Post
              </Button>
            </Box>
          </div>
        </form>
      </div>
    </section>
  );
};
