
import { UserContext } from "../contexts/UserContext";
import React, { useContext } from "react";

const HomePage = () => {
  const { user } = useContext(UserContext);

return (
<div class="container mt-5">
    <h1 class="mt-5">Home</h1>
<div class="container mt-5">
  <div class="row">
    <div class="col-sm">
      One of three columns
    </div>
    <div class="col-sm">
      One of three columns
    </div>
    <div class="col-sm">
      One of three columns
    </div>
  </div>

  <div class="row mt-5">
    <div class="col-sm">
      One of three columns
    </div>
    <div class="col-sm">
      One of three columns
    </div>
    <div class="col-sm">
      One of three columns
    </div>
  </div>


  <div class="row mt-5">
    <div class="col-sm">
      One of three columns
    </div>
    <div class="col-sm">
      One of three columns
    </div>
    <div class="col-sm">
      One of three columns
    </div>
  </div>






  </div>

</div>




)





};

export default HomePage;