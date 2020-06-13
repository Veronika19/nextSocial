import React, { useEffect, useState } from "react";
import Bus from "../bus";
import isEmpty from "../is-empty";
import { useDispatch } from "react-redux";
import { removeErrors } from "../../redux/actions/authActions";
// import './index.css';

const Flash = () => {
    let [visibility, setVisibility] = useState(false);
    let [message, setMessage] = useState("");
    let [type, setType] = useState("");
    const dispatch = useDispatch();

    function flashMsg({ message, type }) {
        if (!isEmpty(message)) {
            setVisibility(true);
            setMessage(message);
            setType(type);
            setTimeout(() => {
                setVisibility(false);
            }, 4000);
        }
    }

    useEffect(() => {
        Bus.addListener("flash", flashMsg);

        return () => {
            Bus.removeListener("flash", flashMsg);
        };
    }, []);

    useEffect(() => {
        if (document.querySelector(".alert") !== null) {
            document
                .querySelector(".alert")
                .addEventListener("click", () => setVisibility(false));
            dispatch(removeErrors());
        }
    });

    return (
        visibility && (
            <div className="row justify-content-center">
                <i className={`alert alert-${type}`}>{message}</i>
            </div>
        )
    );
};

export default Flash;
