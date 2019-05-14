export default function expire(d = 7, h = 24, s = 3600, ms = 1000) {
    return Date.now() + d*h*s*ms;
}
