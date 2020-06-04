import React, {Component} from 'react';
import Button from './Button'

class Map extends Component {

  constructor(props) {
    super(props);
    this.backgroundImage = new Image();
    this.backgroundImage.onload = () => {
      this.drawBackgroundImage();
    };
    this.canvasReference = React.createRef();
    this.backgroundImage.src = "campus_map.jpg";
  }

  /**
   * Sets the background image
   */
  drawBackgroundImage = () => {
    let canvas = this.canvasReference.current;
    let ctx = canvas.getContext("2d");

    if (this.backgroundImage.complete) {
      canvas.width = this.backgroundImage.width;
      canvas.height = this.backgroundImage.height;
      ctx.drawImage(this.backgroundImage, 0, 0);
    }
  };

   /**
   * Clears the map from the canvas
   */
  clearMap = () => {
      this.drawBackgroundImage();
      this.props.onClearStart();
      this.props.onClearEnd();
  };

  /**
  * Fetches path data from the server
  */
  makeRequestForPath = () => {
      let path = "http://localhost:4567/findPath?start=" + this.props.startBuilding +
                 "&end=" + this.props.endBuilding;
      if (this.props.startBuilding === "" || this.props.endBuilding === "") {
          alert("Enter start and/or end buildings");
      } else {
          fetch(path)
              .then((res) => {
                      if (res.status !== 200) {
                          throw Error("The server could not process the request.");
                      }
                      return res.json();
                  }
              ).then((resText) => {
                  this.drawPath(resText);
              }
          ).catch((error) => {
              alert(error);
          });
      }
  };

  /**
  * Draws the desired path onto the map
  *
  * @param resText is the data from the server that is used to draw the map
  */
  drawPath = (resText) => {
      let ctx = this.canvasReference.current.getContext('2d');
      let path = resText.path;
      for (let i in path) {
          let line = path[i];
          let startPoint = line.start;
          let endPoint = line.end;
          this.drawLines(startPoint, endPoint, ctx);
      }
  };

   /**
   * Draws line segment that compose of the path. Each line segment is drawn from its starting point
   * to its ending point
   * @param startPoint is the point from where the line segment is drawn from
   * @param endPoint is the point at which the line segment ends
   * @param ctx is on what the line segment is drawn on
   */
   drawLines = (startPoint, endPoint, ctx) => {
      let startX = startPoint.x;
      let startY = startPoint.y;
      let endX = endPoint.x;
      let endY = endPoint.y;

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.lineWidth = 15;
      ctx.strokeStyle = "teal"; // color of the edge
      ctx.stroke();
  };

  render() {
    return (
      <div className="canvasHolder">
        <canvas ref={this.canvasReference} width={this.props.width} height={this.props.height} />
        <Button color="primary" onClick={this.makeRequestForPath} value="Draw" />
        <Button color="secondary" onClick={this.clearMap} value="Clear"/>
      </div>
    )
  }
}

export default Map;

