import React, { useState } from 'react';
import Nava from './Nava';
import axios from 'axios';

const Hist = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [normalizedImage, setNormalizedImage] = useState(null);
  const [inputImage, setInputImage] = useState(null);
  const [maskOverlayImage, setMaskOverlayImage] = useState(null);
  const [boundingBoxesImage, setBoundingBoxesImage] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setInputImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleReinhardtNormalization = () => {
    const formData = new FormData();
    formData.append('input_image', selectedFile);

    axios
      .post('https://654c-2409-408c-1414-77ae-349f-579b-7ee0-17c8.ngrok.io/api/reinhardt-normalization', formData)
      .then((response) => {
        setResult(response.data);
        setNormalizedImage(response.data.normalized_image);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCompleteCode = () => {
    const formData = new FormData();
    formData.append('input_image', selectedFile);

    axios
      .post('https://654c-2409-408c-1414-77ae-349f-579b-7ee0-17c8.ngrok.io/api/execute-notebook', formData)
      .then((response) => {
        setResult(response.data);
        setMaskOverlayImage(`data:image/png;base64,${response.data.mask_overlay}`);
        setBoundingBoxesImage(`data:image/png;base64,${response.data.bounding_boxes}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div id="nav1">
        <Nava />
      </div>
      <div className="container-fluid log-welcome">
        <div className="row justify-content-center">
          <div className="col-9 m-4 p-4 rounded bg-light">
            <h2>Input Image</h2>
            <input
              className="form-control form-control-sm"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            <br />
            {inputImage && normalizedImage && (
              <div className="d-flex justify-content-center">
                <div className="image-container text-center">
                  <img
                    src={inputImage}
                    alt="Input"
                    style={{ height: 'auto', border: '1px solid black', width: '20vw' }}
                  />
                  <p style={{ fontWeight: '500' }}>Input</p>
                </div>
                <div className="image-container text-center" style={{ marginLeft: '2rem' }}>
                  <img
                    src={`data:image/png;base64,${normalizedImage}`}
                    alt="Normalized"
                    style={{ height: 'auto', border: '1px solid black', width: '20vw' }}
                  />
                  <p style={{ fontWeight: '500' }}>Normalized</p>
                </div>
              </div>
            )}
            <div className="d-flex justify-content-center">
              <button
                className="btn log-button"
                type="button"
                onClick={handleReinhardtNormalization}
                style={{ background: '#5d96f8', marginRight: '1rem', fontWeight: '500', fontSize: '17px' }}
              >
                Reinhard Normalization
              </button>
              <button
                className="btn log-button"
                type="button"
                onClick={handleCompleteCode}
                style={{ background: '#5d96f8', fontWeight: '500', fontSize: '17px' }}
              >
                Nuclei Segmentation
              </button>
            </div>
            <br></br>
            <div className="d-flex justify-content-center">
              {maskOverlayImage && (
                <div className="image-container text-center mt-4" style={{ marginLeft: '2rem' }}>
                  <img
                    src={maskOverlayImage}
                    alt="Mask Overlay"
                    style={{ height: 'auto', border: '1px solid black', width: '20vw' }}
                  />
                  <p style={{ fontWeight: '500' }}>Nuclei Segmentation Mask Overlay</p>
                </div>
              )}
              {boundingBoxesImage && (
                <div className="image-container text-center mt-4" style={{ marginLeft: '2rem' }}>
                  <img
                    src={boundingBoxesImage}
                    alt="Bounding Boxes"
                    style={{ height: 'auto', border: '1px solid black', width: '20vw' }}
                  />
                  <p style={{ fontWeight: '500' }}>Nuclei Bounding Boxes</p>
                </div>
              )}
            </div>
            {result && (
              <div className="justify-content-center">
                <br></br>
                <center>
                  <h2 style={{ textDecoration: 'underline' }}>Results</h2> <br></br>
                </center>
                <center>
                  <p style={{ fontWeight: '500', fontSize: '20px' }}>Nuclei Segmentation: {result.number_of_nuclei}</p>
                </center>
                {/* Display other relevant results */}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Hist;
