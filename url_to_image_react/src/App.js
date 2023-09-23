import React from "react";
import ImageList from "./components/ImageList";
import "./styles.css";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      images: [],
      imageUrl: ""
    };
  }

  // Function to add image to local storage
  addImageToLS = () => {
    localStorage.setItem(
      "images",
      JSON.stringify([...this.state.images, this.state.imageUrl])
    );
  };

  // Function to get images from the local storage
  getImagesFromLS = () => {
    const images = localStorage.getItem("images");
    if (!images) {
      localStorage.setItem("images", []);
      return [];
    }
    return JSON.parse(images);
  };

  onAddImage = (e) => {
    e.preventDefault();
    this.addImageToLS();
    this.setState((prevState)=>{
      return {
      images: [...prevState.images , this.state.imageUrl],
      imageUrl : ""
      }
    })
  };
     
  // Create function to set image url OR BANE FUNCTION KA USE KARE SO BANAO
  setimageurl=(e)=>{
    this.setState({
      imageUrl : e.target.value
    })
  }
  // Use appropriate lifecycle method to get images
  componentDidMount(){
    const images = this.getImagesFromLS();
    this.setState({images});
  } 
     
  render() {
    return (
      <>
        <form onSubmit={this.onAddImage}>
          <input
            type="text"
            placeholder="Image URL"
            value={this.state.imageUrl}
            onChange={this.setimageurl}
          />
          <button>Add Image</button>
        </form>
        <ImageList images={this.state.images} />
      </>
    );
  }
}
