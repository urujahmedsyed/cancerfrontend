import React, { useState, useEffect } from 'react';
import Nava from './Nava';
import axios from 'axios';
import '../styles/pred.css';

export default function ImageUpload() {
  const [file, setFile] = useState(null);
  const [predicting, setOut] = useState(false);
  const [predicted, setPredicted] = useState(false);
  const [prediction, setOutput] = useState('');
  const [image, setImage] = useState('');
  const [response, setResponse] = useState(null);
  const [convertedImg, setConvertedImg] = useState('');
  const [allredScore, setAllredScore] = useState(null); // State to store the calculated Allred score


  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (response && response.image) {
  //       try {
  //         const { data } = await axios.post(
  //           'http://localhost:5001/api/check-image',
  //           { image: response.image },
  //           { responseType: 'json' }
  //         );
  //         console.log(data);
  //         // if (data.convertedImage) {
  //         //   setConvertedImg(data.convertedImage);
  //         // } else {
  //         //   setConvertedImg('');
  //         //   console.log('not working');
  //         // }
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     }
  //   };

  //   fetchData();
  // }, [response]);

  const FileChange = (e) => {
    setOut(false);
    setPredicted(false);
    setConvertedImg('');
    const reader = new FileReader();
    const selectedFile = e.target.files[0];
    reader.onloadend = () => {
      setFile(selectedFile);
      setImage(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setOut(true);
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          mfa: 'your_header_value', // Replace 'your_header_value' with the actual header value
        },
      };

      try {
        const { data } = await axios.post(
          'https://9fd6-2405-201-c009-a238-b9e6-54b6-a6fd-3825.ngrok-free.app/api/yolov5',
          formData,
          config
        );
        setResponse(data);
        if (data.code === 0) {
          setOutput(data.image);
          await handleCheckImage(file);
          setPredicted(true);
        } else {
          setPredicted(false);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      document.getElementById('filered').innerHTML = 'File Could not be Found.';
    }
    setOut(false);
  };

  const handleCheckImage = async (file) => {
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          mfa: 'your_header_value', // Replace 'your_header_value' with the actual header value
        },
      };

      try {
        const { data } = await axios.post(
          'https://9fd6-2405-201-c009-a238-b9e6-54b6-a6fd-3825.ngrok-free.app/api/check-image',
          formData,
          config
        );
        if (data.code === 0 && data.convertedImage) {
          setConvertedImg(data.convertedImage);
        } else {
          setConvertedImg('');
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      document.getElementById('filered').innerHTML = 'File Could not be Found.';
    }
  };

  const calculateAllredScore = (counts) => {
    const prop = (counts[1] + counts[2] + counts[3]) / (counts[0] + counts[1] + counts[2] + counts[3]);
    const inten = Math.floor((counts[1] + counts[2] * 2 + counts[3] * 3) / (counts[1] + counts[2] + counts[3]));
    const proportion = prop === 0 ? 0 : prop <= 0.01 ? 1 : prop <= 0.1 ? 2 : prop <= 0.33 ? 3 : prop <= 0.66 ? 4 : 5;
    const intensity = counts[1] + counts[2] + counts[3] === 0 ? 0 : inten;
    const allred = proportion + intensity;
    setAllredScore(allred);
  };

  useEffect(() => {
    if (response && response.n && response.w && response.m && response.s) {
      const counts = [response.n, response.w, response.m, response.s];
      calculateAllredScore(counts);
    }
  }, [response]);

  return (
    <>
      <div id="nav1">
        <Nava />
      </div>
      <div className="container-fluid log-welcome">
        <form className="row justify-content-center" onSubmit={(e) => handleFormSubmit(e)}>
          <div className="col-9 m-4 p-4 rounded bg-light">
            <p className="fw-bold m-2">Input Scan Image : </p>
            <input className="form-control form-control-sm" type="file" onChange={FileChange} />
            <br></br>
            <div className="d-flex justify-content-center">
              {predicted && response && (
                <>
                  <div className="image-container text-center">
                    <img
                      src={image}
                      alt="input-image-copy"
                      style={{ height: 'auto', border: '1px solid black' }}
                    />
                    <p style={{ fontWeight: '500' }}>Input</p>
                  </div>
                  <div className="image-container text-center">
                    <img
                      src={`data:image/png;base64,${prediction}`}
                      alt="output"
                      style={{ height: 'auto', marginLeft: '2rem', border: '1px solid black' }}
                    />
                    <p style={{ marginLeft: '3rem',fontWeight: '500' }}>Prediction</p>
                  </div>
                  <div className="image-container text-center">
                    {convertedImg ? (
                      <div>
                      <img
                        src={`data:image/png;base64,${convertedImg}`}
                        alt="output"
                        style={{ height: 'auto', marginLeft: '2rem', border: '1px solid black' }}
                      />
                      <p style={{ fontWeight: '500', marginLeft: '1.5rem' }}>Ground Truth</p>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                </>
              )}
            </div>
            <div className="d-flex justify-content-center">
              <br></br>
              <p id="filered" className="outred fs-6 fw-lighter"></p>
            </div>
            <div className="d-flex justify-content-end m-3">
              {predicting ? (
                <button
                  className="btn log-button disabled"
                  style={{ marginRight: '44.5%', fontWeight: '500' }}
                >
                  Predicting
                  <div className="ms-2 spinner-border spinner-border-sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </button>
              ) : (
                <>
                  <button
                    className="btn log-button"
                    type="submit"
                    style={{
                      background: '#5d96f8',
                      marginRight: '30rem',
                      fontWeight: '500',
                      fontSize: '17px',
                    }}
                  >
                    Predict
                  </button>
                </>
              )}
            </div>
            {predicted && response && (
              <div id="dome16" className="text-center">
                <div>
                  <br></br>
                  <br></br>
                  <h3 className="fw-bold" style={{ textDecoration: 'underline' }}>
                    Predicted Counts
                  </h3>
                  <h3>
                    N : <span>{response.n}</span>
                  </h3>
                  <h3>
                    W : <span>{response.w}</span>
                  </h3>
                  <h3>
                    M : <span>{response.m}</span>
                  </h3>
                  <h3>
                    S : <span>{response.s}</span>
                  </h3>
                  <h3>
                    All : <span>{response.all}</span>
                  </h3>
                  <br></br>
                  <h3>
                    AllRed Score: 7 <span>{allredScore}</span>
                  </h3>
                </div>
                <br></br>
              </div>
            )}
          </div>
        </form>
      </div>
    </>
  );
}