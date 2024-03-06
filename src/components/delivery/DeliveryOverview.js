import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAtom } from "jotai";
import { client } from "../../App";
import OrderDetail from "./OrderDetail";

export default function DeliveryOverview() {
  const [loggato, setLoggato] = useAtom(client);
  const [deliveries, setDeliveries] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    axios.get("/delivery/" + loggato.id).then(response => {
      if (response.status === 200) {
        setDeliveries(response.data);
      } else {
        console.error("Error while retrieving orders:", response.statusText);
      }
    }).catch(error => {
      console.error("Error during the request:", error);
    });
  }, [loggato.id]); // Aggiunta di loggato.id come dipendenza per rifare la chiamata se cambia l'id

  const formatTime = (isoDateString) => {
    const date = new Date(isoDateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day}/${month}/${year} at ${hours}:${minutes}`;
  };

  const toggleDetails = (order) => {
    if (selectedOrder && selectedOrder.id === order.id) {
      setSelectedOrder(null); // Chiudi i dettagli se lo stesso ordine viene cliccato di nuovo
    } else {
      setSelectedOrder(order); // Mostra i dettagli dell'ordine selezionato
    }
  };

  return (
    <>
      <div className="container my-5">
        <h2 className="text-center mb-4">Your Order History</h2>
        {deliveries.length > 0 ? (
          deliveries.map((delivery) => (
            <div key={delivery.id}>
              <div className="row justify-content-between align-items-center mb-2">
                <div className="col">
                  <p>Order ID: {delivery.id} - Delivery Time: {formatTime(delivery.expected_arrival)} - Payment Method: {delivery.payment_method} - Total: {delivery.total_price}€</p>
                </div>
                <div className="col-auto">
                  <button className="btn btn-sm btn-outline-dark" onClick={() => toggleDetails(delivery)}>
                    {selectedOrder && selectedOrder.id === delivery.id ? "Hide Details" : "Order Details"}
                  </button>
                </div>
              </div>
              {selectedOrder && selectedOrder.id === delivery.id && (
                <div className="row text-center">
                  <div className="col">
                    <OrderDetail order={delivery} />
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </>
  );
  
}