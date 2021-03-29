export default function FindWaypoints(lat, lng, distance) {
    var o = lat * Math.PI / 180;
    var i = lng * Math.PI / 180;
    var m = (distance - 1) * 0.609344;
    var k = Math.PI / 180 * ((120 - 60) * Math.random() + 60);
    var f = 0.85;
    var p = f * m / (2 + 2 * Math.sin(k / 2));
    var c = 4000 * Math.cos(o);
    var d = 2 * Math.random() * Math.PI;
    var n = p * Math.cos(d) / 4000 + o;
    var g = i + p * Math.sin(d) / c;
    var l = p * Math.cos(d + k) / 4000 + o;
    var e = i + p * Math.sin(d + k) / c;
    var LatLng2 = [(n * 180 / Math.PI), (g * 180 / Math.PI)];
    var LatLng3 = [(l * 180 / Math.PI), (e * 180 / Math.PI)];
    var LatLng4 = [(l * 180 / Math.PI), (e * 180 / Math.PI)];
    var LatLng5 = [(l * 180 / Math.PI), (e * 180 / Math.PI)];

    return { LatLng2, LatLng3, LatLng4, LatLng5 };
}