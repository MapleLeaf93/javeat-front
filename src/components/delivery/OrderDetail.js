import React from "react";

export default function OrderDetail({ order }) {
    return (
        <div className="col-12 container justify-content-between my-3">
            <div className="col mx-5">
                <h5 className="fw-semibold border border-dark rounded mx-3">{order.restaurant_name}</h5>
                <p><b>Order Notes:</b></p>
                <p className="px-1">{order.notes ? order.notes : "No notes on this order"}</p>
            </div>
            <div className="text-start col-auto me-5">
                <h6><b>Dish Ordered:</b></h6>
                {order.dishesDeliveries.map((dishDelivery) => (
                    <p key={dishDelivery.id}>
                        {dishDelivery.quantity} x {dishDelivery.dish.name}
                    </p>
                ))}
            </div>
        </div>
    );
}
