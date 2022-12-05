
import cover from '../../assets/img/cover.png'
import getDataApi from '../../config/Api'

export const coverImages = { image: cover, value: 'volleyBall' }

const getDataImages = async () => {
  const res = await getDataApi.get("", {});
  let images = []
  res.data.cardImages.map((element) => {
    const {
      name,
      src,
    } = element;
    return (
     images.push({ image: src, value: name })
    );
  })


  return images;
};


export const imagesData = getDataImages()
