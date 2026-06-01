import React, { useState, useEffect } from "react";
import API from "../axiosConfig";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        const res = await API.get("/users/profile");
        setProfile(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Gabim gjate marrjes se profilit:", err);
        setError(err.response?.data?.error || "Profile not found.");
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        Loading profile...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600">
        {error}
      </div>
    );
  if (!profile) return <div className="no-orders p-8">User not found.</div>;

  const klient = profile.klientProfile;
  const porosite = klient?.shitjet || [];

  return (
    <div className="profile-container">
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center text-xs uppercase tracking-widest text-gray-500 hover:text=[#baa373] transition-colors font-medium"
        >
          <i className="fas fa-arrow-left mr-2"></i>Go back to Shop
        </Link>
      </div>
      <div className="profile-header">
        <div className="user-meta">
          <h2>
            {profile.emri}
            {profile.mbiemri}
          </h2>
          <p className="user-email">✉ {profile.email}</p>
          {profile.phone_number && (
            <p className="user-phone">📞 {profile.phone_number}</p>
          )}
        </div>
      </div>

      <hr className="divider" />

      <div className="profile-details-section">
        <h3>Delivery Info</h3>
        {klient ? (
          <div className="details-grid">
            <p>
              <strong>Address:</strong> {klient.adresa}
            </p>
            <p>
              <strong>Gender:</strong> {klient.gjinia}
            </p>
            <p>
              <strong>Phone number:</strong>{" "}
              {klient.telefoni || profile.phone_number || "Not found"}
            </p>
            <p>
              <strong>Logged in:</strong>{" "}
              {new Date(profile.data_krijimit).toLocaleDateString()}
            </p>
          </div>
        ) : (
          <div className="no-client-profile">
            <p>You haven't logged in yet. Log in to set up your profile.</p>
          </div>
        )}
      </div>

      <hr className="divider" />

      <div className="order-history-section">
        <h3>Your Order History</h3>
        {porosite.length === 0 ? (
          <p className="no-orders">You haven't made any purchase yet.</p>
        ) : (
          <div className="orders-table-wrapper">
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Purchase ID</th>
                  <th>Date</th>
                  <th>Purchased Products</th>
                  <th>Payment</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {porosite.map((porosi) => (
                  <tr key={porosi.shitje_id}>
                    <td className="font-mono text-gray-400">
                      #{porosi.shitje_id}
                    </td>
                    <td className="text-gray-500">
                      {new Date(porosi.data_shitjes).toLocaleDateString()}
                    </td>
                    <td>
                      <ul className="orders-items-list">
                        {porosi.detajet?.map((detal) => (
                          <li key={detal.detal_id}>
                            {detal.parfum?.emri}
                            <span className="text-gray-400 text-xs ml-1">
                              x{detal.sasia}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td>
                      <span className="payment-method">
                        {porosi.metoda_pageses}
                      </span>
                    </td>
                    <td className="order-total">
                      <strong>{porosi.shuma_totale.toFixed(2)} $</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
