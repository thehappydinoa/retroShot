import React from "react";

import "./shot.css";

// const Shot = () => {
//   let i = 0;
//   return (
//     <div className='shot-container'>
//         <p>Insert shot here</p>
//     </div>
//   );
// };

class FetchRandomShot extends React.Component {
  state = {
    isLoading: true,
    shot: null,
  };

  async componentDidMount() {
    const url =
      "https://us-central1-retroshot-6a964.cloudfunctions.net/api/shot/random";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      isLoading: false,
      shot: data,
    });
  }

  render() {
    let { isLoading, shot } = this.state;

    return (
      <div className="shot-container">
        {isLoading || !shot ? (
          <div>Loading retroShot...</div>
        ) : (
          <div>
            <img className="shot-img" src={shot.data.imgUrl} alt="Retro shot" />
            <p>Photo submitted by u/{shot.data.user}</p>
          </div>
        )}
      </div>
    );
  }
}

export default FetchRandomShot;
