import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";


export default function Home() {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodcat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();
    // console.log(response[0],response[1])
    setFoodItem(response[0]);
    setFoodcat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div >
      <div> <Header /> </div>
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel">
          <div className="carousel-inner " id='carousel'>
            <div className=" carousel-caption  " style={{ zIndex: "9" }}>
              <div className=" d-flex justify-content-center">  
                <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Search in here..." aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                <button className="btn text-white bg-danger" onClick={() => { setSearch('') }}>X</button>
              </div>
            </div>
            <div className="carousel-item active" >
              <img src="https://source.unsplash.com/random/900x700/?food" className="d-block w-100  " style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/900x700/?pizza" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/900x700/?barbeque  " className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container">
      {
        foodCat !== [] ? foodCat.map((data) => {
            return (
              // justify-content-center
              <div className='row mb-3'>
                <div key={data.x1id} className='fs-3 m-3'>
                  {data.CategoryName}
                </div>
                <hr id="hr-success" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))" }} />
                { foodItem !== [] ? foodItem.filter(
                  (items) => (items.CategoryName === data.CategoryName) && (items.name.toLowerCase().includes(search.toLowerCase())))
                  .map(filterItems => {
                    return (
                      <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                        {console.log(filterItems.url)}
                        <Card foodName={filterItems.name} item={filterItems} options={filterItems.options[0]} imgSrc={filterItems.img} discription = {filterItems.description} ></Card>
                      </div>
                    )
                  }) : <div> No Such Data </div>}
                  
              </div>
            )
          })
          : ""}
         
      </div>

      <div> <Footer /> </div>
    </div>
  )
}
{/* <div className='container'> 
</div> */}