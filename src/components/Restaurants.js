/****************************************************************************
 * WEB422 – Assignment 3
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Name: _byeongsuk yoo__ Student ID: _062411079_ Date: _20210625_
 *
 * Online Link to Restaurant App: _https://web422a3.vercel.app/Restaurants___
 *
 ***********************************************************************************/

import React, { useState, useEffect } from "react";
import { Card, Table, Pagination } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";

const Restaurants = (props) => {
  const [restaurants, setRestaurants] = useState(null);
  const [page, setPage] = useState(1);

  let location = useLocation();
  //console.log("1", location.pathname);

  const Hist = useHistory();
  const query = queryString.parse(location.search).borough;
  console.log("2", query);
  const previousPage = () => {
    setPage(page - 1);
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    let uri = query
      ? `https://mighty-plains-59068.herokuapp.com/api/restaurants?page=${page}&perPage=10&borough=${query}`
      : `https://mighty-plains-59068.herokuapp.com/api/restaurants?page=${page}&perPage=10`;

    fetch(uri, {
      method: "GET",
      header: { "Content-Type": "application/json" },
    })
      .then((result) => result.json())
      .then((data) => {
        setRestaurants(data);
      })
      .catch((error) => console.log(error));
  }, [query, page]);

  return (
    <>
      {/* <h1>
        Project query {JSON.stringify(queryString.parse(location.pathname))}
      </h1>*/}
      <Card bg="light">
        <Card.Body>
          <Card.Title> Restaurant List </Card.Title>{" "}
          <Card.Text> Full list of restaurants. </Card.Text>{" "}
        </Card.Body>{" "}
      </Card>
      {restaurants !== null && restaurants.length > 0 ? (
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th> Name </th> <th> Address </th> <th> Borough </th>{" "}
              <th> Cuisine </th>{" "}
            </tr>{" "}
          </thead>{" "}
          <tbody>
            {" "}
            {restaurants.map((restaurant) => (
              <tr
                key={restaurant._id}
                onClick={() => Hist.push(`/restaurant/${restaurant._id}`)}
              >
                <td> {restaurant.name} </td>{" "}
                <td>
                  {" "}
                  {restaurant.address.building} {restaurant.address.street}{" "}
                </td>{" "}
                <td> {restaurant.borough} </td> <td> {restaurant.cuisine} </td>{" "}
              </tr>
            ))}{" "}
          </tbody>
        </Table>
      ) : (
        <Card bg="light" className="mt-4">
          <Card.Body>
            <Card.Text> No restaurants found </Card.Text>{" "}
          </Card.Body>{" "}
        </Card>
      )}
      {restaurants !== null && restaurants.length > 0 && (
        <Pagination className="mt-4">
          <Pagination.Prev onClick={previousPage} />{" "}
          {/* <Pagination.Item>{pageActive(page)}</Pagination.Item>*/}
          {/*<Pagination.Item> {page - 1} </Pagination.Item>{" "}*/}
          <Pagination.Item active> {page} </Pagination.Item>{" "}
          {/*<Pagination.Item> {page + 1} </Pagination.Item>{" "} need to function?  */}
          <Pagination.Next onClick={nextPage} />{" "}
        </Pagination>
      )}{" "}
    </>
  );
};

export default Restaurants;
