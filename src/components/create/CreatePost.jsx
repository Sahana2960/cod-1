import React, { useState, useEffect, useContext } from "react";
import { Box } from "@mui/material";
import { styled, TextareaAutosize, Button, InputBase, FormControl } from "@mui/material";
import { DataContext } from "../../context/DataProvider"; // ✅ Import Context
import { API } from "../../service/api";
import { useLocation, useNavigate } from "react-router-dom";
import { AddCircle as Add } from "@mui/icons-material";

const Container = styled(Box)(({ theme }) => ({
  margin: "50px 100px",
  [theme.breakpoints.down("md")]: {
    margin: 0,
  },
}));

const StyledFormControl = styled(FormControl)`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`;

const Image = styled("img")({
  width: "100%",
  height: "50vh",
  objectFit: "cover",
});

const InputTextField = styled(InputBase)`
  flex: 1;
  margin: 0 30px;
  font-size: 25px;
`;

const Textarea = styled(TextareaAutosize)`
  width: 100%;
  border: none;
  margin-top: 50px;
  font-size: 18px;
  &:focus-visible {
    outline: none;
  }
`;

const initialPost = {
  title: "",
  description: "",
  picture: "",
  username: "",
  categories: "",
  createdDate: new Date(),
};

const CreatePost = () => {
  const url =
    "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";

  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const { account } = useContext(DataContext); // ✅ Get `account` from context

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await API.uploadFile(data);
        post.picture = response?.data?.url || "";
      }
    };
    getImage();

    setPost((prevPost) => ({
      ...prevPost,
      categories: location.search?.split("=")[1] || "All",
      username: account?.username || "Guest", // ✅ Ensure `account` exists
    }));
  }, [file, account, location.search]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const savePost = async () => {
    await API.createPost(post);
    navigate("/");
  };

  return (
    <Container>
      <Image src={url} alt="banner" />

      <StyledFormControl>
        <label htmlFor="fileInput">
          <Add fontSize="large" color="action" />
        </label>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <InputTextField onChange={handleChange} name="title" placeholder="Title" />
        <Button onClick={savePost} variant="contained" color="primary">
          Publish
        </Button>
      </StyledFormControl>

      <Textarea rowsMin={5} placeholder="Tell your story..." name="description" onChange={handleChange} />
    </Container>
  );
};

export default CreatePost;
