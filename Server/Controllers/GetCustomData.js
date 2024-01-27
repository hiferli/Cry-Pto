
export const getCustomData = (request , response) => {
    let min = parseFloat(request.query.min) || 10;
    let max = parseFloat(request.query.max) || 100;
    let prev = parseFloat(request.query.prev) || 0;

    // console.log({min , max , prev})
    const y = +((Math.random() * (max - min) + min).toFixed(2));
    const x = prev + 1;

    return response.status(200).json({
        status: true,
        coordinates: {
            x: x,
            y: y
        }
    })
}