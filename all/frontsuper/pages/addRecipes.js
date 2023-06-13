import React, { useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

function Product() {
  const [alldata, setdata] = useState('');
  const [hasPhoto, sethasPhoto] = useState(false);
  const { register, handleSubmit } = useForm();

  const videoRef = useRef(null)
  const photoRef = useRef(null)

  const onSubmitt = (data) => {
    console.log('submit');
    console.log(data);
    console.log('submit');
    setdata(data);
  };

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 1920, height: 1080, }
      })
      .then(stream => {
        let video = videoRef.current
        video.srcObject = stream
        video.play()
      })
      .catch(err => {
        console.log(err)
      })
  }

  const takePhoto = () => {
    const width = 414
    const height = width / (16/9)

    let video = videoRef.current
    let photo = photoRef.current

    photo.width = width
    photo.height = height

    let ctx = photo.getContext('2d')
    ctx.drawImage(video , 0 , 0 ,width, height)
  }

  const closePhoto = () =>{
    let photo = photoRef.current
    let ctx = photoRef.getContext('2d')

    ctx.clearReact(0,0,photo.width , photo.height)

    sethasPhoto(false)
  }

  useEffect(() =>{
    getVideo()
  },[videoRef])



  return (
    <div>
      <div>
        <form onSubmit={handleSubmit(onSubmitt)}>
          <div>
            <video ref={videoRef}></video>
            <button onClick={takePhoto} >צלם</button>
          </div>
          <div>
            <canvas ref={photoRef}></canvas>
            <button onClick={closePhoto} >סגור</button>
          </div>
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
          <button type="button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Product;
