import React, { useState, useEffect } from "react";
import { Rating } from "flowbite-react";

interface Props {
  rating: number;
}
var code = (<div></div>);
var one = false, two = false, three = false, four = false, five = false;
function clean() {
    one = false;
    two = false;
    three = false;
    four = false;
    five = false;
}

const Stars: React.FC<Props> = ({ rating }) => { 
    clean()
    if (rating >= 1) { one = true; }
    if (rating >= 2) {one = true;  two = true; }
    if (rating >= 3) {one = true;  two = true; three = true; }
    if (rating >= 4) { one = true;  two = true; three = true; four = true; }
    if (rating >= 5) { one = true;  two = true; three = true; four = true; five = true; }
    code = (
      <React.Fragment>
        <Rating>
          <Rating.Star filled={one} />
          <Rating.Star filled={two} />
          <Rating.Star filled={three} />
          <Rating.Star filled={four} />
          <Rating.Star filled={five} />
        </Rating>
      </React.Fragment>
    );
  
  return (code);
};

export default Stars;
