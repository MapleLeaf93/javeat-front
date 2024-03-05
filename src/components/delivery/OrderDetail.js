import React from "react";

export default function OrderDetail({ order }) {
    return (
        <div>
            <h5>Restaurant {order.restaurant_name}</h5>
            <p><b>Order Notes:</b> {order.note ? order.note : "No notes on this order"}</p>
            <div className="text-start">
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
