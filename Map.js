class Map {
  constructor() {}
}

Map.prototype.ScrollFixed = function() {
  // var navWrap = $('.right-content'),
  //   nav = $('.left-content'),
  //   startPosition = navWrap.offset().top,
  //   stopPosition = $('.left-content').offset().top - nav.outerHeight();
  // $(document).scroll(function() {
  //   //stick nav to top of page
  //   var y = $(this).scrollTop();
  //   if (y > startPosition) {
  //     nav.addClass('sticky');
  //     if (y > stopPosition) {
  //       nav.css('top', stopPosition - y);
  //     } else {
  //       nav.css('top', 1000);
  //     }
  //   } else {
  //     nav.removeClass('sticky');
  //   }
  // });
};
Map.prototype.DisplayMap = function() {
  mapboxgl.accessToken =
    "pk.eyJ1IjoiaGF5dGFtIiwiYSI6ImNrNnQybDViazA0eXYzZW80Z3ZxaXd4cGMifQ.pX_9SsTjc2o2Ac7Us81LHw";
  var map = new mapboxgl.Map({
    style: "mapbox://styles/mapbox/light-v10",
    center: [-74.0066, 40.7135],
    zoom: 15.5,
    pitch: 45,
    bearing: -17.6,
    container: "map",
    antialias: true,
  });

  // The 'building' layer in the mapbox-streets vector source contains building-height
  // data from OpenStreetMap.
  map.on("load", function() {
    // Insert the layer beneath any symbol layer.
    var layers = map.getStyle().layers;

    var labelLayerId;
    for (var i = 0; i < layers.length; i++) {
      if (layers[i].type === "symbol" && layers[i].layout["text-field"]) {
        labelLayerId = layers[i].id;
        break;
      }
    }

    map.addLayer(
      {
        id: "3d-buildings",
        source: "composite",
        "source-layer": "building",
        filter: ["==", "extrude", "true"],
        type: "fill-extrusion",
        minzoom: 15,
        paint: {
          "fill-extrusion-color": "#aaa",

          // use an 'interpolate' expression to add a smooth transition effect to the
          // buildings as the user zooms in
          "fill-extrusion-height": [
            "interpolate",
            ["linear"],
            ["zoom"],
            15,
            0,
            15.05,
            ["get", "height"],
          ],
          "fill-extrusion-base": [
            "interpolate",
            ["linear"],
            ["zoom"],
            15,
            0,
            15.05,
            ["get", "min_height"],
          ],
          "fill-extrusion-opacity": 0.6,
        },
      },
      labelLayerId
    );
  });
};
