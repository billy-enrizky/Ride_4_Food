import { useLoadScript } from "@react-google-maps/api";
import Map from "../components/map";
import mongoose from "mongoose";
import { useEffect, useState } from 'react'
// import "../styles/style.css"

export default function Home() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [restaurantList, setRestaurantList] = useState([])
  const [clickedRestaurant, setClickedRestaurant] = useState({})

  const [clickedRestaurants, setClickedRestaurants] = useState<any>({
    lat: 0,
    long: 0
  })


  useEffect(() => {
    fetchRestaurantInfo()
  }, [])

  const fetchRestaurantInfo = async () => {
    const response = await fetch('http://localhost:3000/api/restaurants')
    const data = await response.json()
    setRestaurantList(data)
  }

  const onRestaurantClick = (restaurantInfo: any) => {
    console.log("restaurantinfo", restaurantInfo)
    setClickedRestaurants(restaurantInfo)
  }



  // const [restaurants, setRestaurants] = useState([])

  if (!isLoaded) return <div>Loading...</div>;
  return <div style={{
    display: 'flex',
    flexDirection: 'row'
  }}>
    <Map
      lat={clickedRestaurants.latitude}
      long={clickedRestaurants.longitude}
    />
    <div style={{
      margin: '10px',
      display: 'flex',
      flexDirection: 'column',
      gap: '5px'
    }}>
      <Card restaurantList={restaurantList} onRestaurantClick={onRestaurantClick}
        clickedRestaurants={clickedRestaurants}
      />
    </div>
  </div>
}

function Card({ restaurantList, onRestaurantClick, clickedRestaurants }: {
  restaurantList: any, onRestaurantClick: any, clickedRestaurants: any
}) {

  const onQuestionMarkClick = async (foodName: any) => {
    console.log("foodName", foodName)
    const response = await fetch('http://localhost:3000/api/cohere',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          foodName,
        })
      }
    )
    const result = await response.json()
      console.log("result", result)
    alert(result.result)

  }
  return (
    <>
      {
        restaurantList.length > 0 && restaurantList?.map((restaurant: any) => {
          return (
            <div className="foodsCard" onClick={() => onRestaurantClick(restaurant)}>
              <h2>{restaurant.name}</h2>
              {
                !!clickedRestaurants && clickedRestaurants._id === restaurant._id && clickedRestaurants?.foods?.map((food: any) => {
                  return (
                    <div className="btnContainer">

                      <button key={food} onClick={() => onQuestionMarkClick(food)}> {food} </button>
                    </div>)
                })
              }
            </div>)
        })
      }
    </>
  )
}