import { Map } from "ol";
import View from "ol/View";

export class MapBinder {
  private map: Map | null = null;

  public set mapInstance(map: Map) {
    this.map = map;
  }

  public moveMapTo(latitude: number, longitude: number) {
    console.log("Moving map to", latitude, longitude);

    if (!this.map) return;
    const view: View = this.map.getView();
    if (!view) return;

    view.animate({
      center: [longitude, latitude],
      duration: 1500,
      //rotation: rotation,
      zoom: 5,
    });
  }
}
