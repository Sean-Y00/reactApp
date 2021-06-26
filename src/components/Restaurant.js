/****************************************************************************
 * WEB422 – Assignment 3
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Name: _byeongsuk yoo__ Student ID: _062411079_ Date: _20210625_
 *
 * Online Link to Restaurant App: _________________________________________________________
 *
 ***********************************************************************************/

import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Card, CardDeck } from "react-bootstrap";
import Moment from "react-moment";

const Restaurant = () => {
  let { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  const [ld, setLoading] = useState(true);

  useEffect(() => {
    console.log(id);

    setLoading(true);
    fetch(`https://mighty-plains-59068.herokuapp.com/api/restaurants/${id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.hasOwnProperty("_id")) {
          setRestaurant(data);
        } else {
          setRestaurant(null);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Unable to load restaurants data: ", err);
      });
  }, [id]);

  return (
    <>
      {" "}
      {restaurant && !ld ? (
        <>
          <Card bg="light" className="mb-4">
            <Card.Body>
              <Card.Title> {restaurant.name} </Card.Title>{" "}
              <Card.Text>
                {" "}
                {restaurant.address.building} {restaurant.address.street}{" "}
              </Card.Text>{" "}
            </Card.Body>{" "}
          </Card>
          <MapContainer
            style={{ height: "400px" }}
            center={[restaurant.address.coord[1], restaurant.address.coord[0]]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker
              position={[
                restaurant.address.coord[1],
                restaurant.address.coord[0],
              ]}
            ></Marker>
          </MapContainer>
          <h3 className="my-4 pb-2 border-bottom"> Ratings </h3>
          <CardDeck className="mb-4">
            {restaurant.grades.map((grdInfo) => (
              <Card>
                <Card.Body>
                  <Card.Header as="h4">Grade: {grdInfo.grade}</Card.Header>
                  <br></br>
                  <Card.Text>
                    {" "}
                    Completed :{""}
                    <Moment date={grdInfo.date} format="L" />{" "}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </CardDeck>{" "}
        </>
      ) : (
        <Card bg="light" className="mt-4">
          <Card.Body>
            <Card.Text> Cannot find Restaurant with id: {id} </Card.Text>{" "}
          </Card.Body>{" "}
        </Card>
      )}{" "}
    </>
  );
};

export default Restaurant;
