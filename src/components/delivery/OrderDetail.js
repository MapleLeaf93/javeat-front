import React from "react";

export default function OrderDetail({ order }) {
    return (
        <div className="col-12 container justify-content-between mb-4">
            <div className="col">
                <h5 className="fw-semibold border border-dark rounded mx-4">{order.restaurant_name}</h5>
                <p><b>Order Notes:</b></p>
                <p className="px-1">{order.note ? order.note : "No notes on this order"}</p>
            </div>
            <div className="text-start col-auto">
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
