export default function pageNotFoundHandler(req, res, next) {
  res.statusCode = 404;
  res.json({
    status: "KO",
    error: "Page Not Found",
  });
}
