import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

function Product() {
  const [alldata, setdata] = useState('');
  const { register, handleSubmit } = useForm();

  const onSubmitt = (data) => {
    console.log('submit');
    console.log(data);
    console.log('submit');
    setdata(data);
  };

  const sendImageToServer = (imageDataUrl) => {
    // אנא כתוב קוד כאן המבצע שליחת התמונה לשרת
    // תוכל להשתמש ב-fetch או ב-axios כדי לבצע בקשת POST לשרת
  };

  const handleImageCaptureSubmit = () => {
    const imageDataUrl = sessionStorage.getItem('capturedImage');
    sendImageToServer(imageDataUrl);
    sessionStorage.removeItem('capturedImage');
  };

  const handleImageClick = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(function (stream) {
          const video = document.getElementById('camera-view');
          video.srcObject = stream;
          video.play();

          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const context = canvas.getContext('2d');

          const captureButton = document.getElementById('capture-button');
          captureButton.addEventListener('click', function () {
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageDataUrl = canvas.toDataURL('image/png');
            sessionStorage.setItem('capturedImage', imageDataUrl);
            video.pause();
            video.srcObject = null;
          });
        })
        .catch(function (error) {
          console.error('Error accessing camera:', error);
        });
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit(onSubmitt)}>
          <label>
            <video
              id="camera-view"
              width="300"
              height="200"
              onClick={handleImageClick}
            ></video>
          </label>
          <button id="capture-button">Capture</button>
          <br />
          <label>
            When does the vacation start?
            <input type="number" placeholder="season start and end" {...register('quantity')} />
          </label>
          <br />
          <label>
            Card Title
            <input type="text" placeholder="Card Title" {...register('name')} />
          </label>
          <br />
          <label>
            Vacation information
            <textarea placeholder="vacation information" {...register('description')} />
          </label>
          <br />
          <label>
            How much does it cost?
            <input type="number" placeholder="how much is cost" {...register('unit_price')} />
          </label>
          <br />
          <label>
            When does the vacation end?
            <input type="date" placeholder="tourism company" {...register('returntime')} />
          </label>
          <br />
          <button type="button" onClick={handleImageCaptureSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Product;
