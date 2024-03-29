import { Combobox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronUpDownIcon,
  KeyIcon,
  LockClosedIcon,
  LockOpenIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import React from "react";
import "./book-create-form.css";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { BOOK_URL } from "apis/api-path";
import { title } from "process";

import { FetchToken } from "hooks/fetch-token";
import SelectFactory from "./select-factory";
import SelectMultiple from "./select-multiple";

interface AuditorInferface {
  id: any;
  name: any;
}
export const BookCreateForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errorAlert, setErrorAlert] = useState("");
  const [color, setColor] = useState("");
  const [client, setClient] = useState("");
  const [standard, setStandard] = useState("");
  const [status, setStatus] = useState("");
  const [auditors, setAuditors] = useState<AuditorInferface[]>([] || null);
  const [factories, setFactories] = useState([]);
  const [dataUser, setDataUser] = useState([]);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [factory, setFactory] = useState("");
  const [startDate, setStartDate] = useState({
    startDate: null,
    endDate: null, // Convert the result to a Date object
  });
  const [endDate, setEndDate] = useState({
    startDate: null,
    endDate: null, // Convert the result to a Date object
  });
  const [selected, setSelected] = useState(auditors[0]);
  const [error, setError] = useState<string[] | null>([]);
  const [query, setQuery] = useState("");
  //set error alert
  const [factoryError, setFatoryError] = useState("");
  const [auditError, setAuditError] = useState("");
  const [startDateError, setStartDateError] = useState("");
  const [endDateError, setEndDateError] = useState("");

  //end
  const getDataFromBook = async () => {
    try {
      const response = await axios.get(`${BOOK_URL}${id}`, {
        headers: {
          Authorization: FetchToken,
        },
      });
      // Handle the response data here
      setStandard(response.data.projects.standard);
      setStatus(response.data.projects.status);
      setClient(response.data.projects.client);
      setTitle(response.data.projects.client);
      setAuditors(response.data.users);
      setFactories(response.data.projects.factories);
      console.log("data: ", response.data.users);
    } catch (error) {
      // Handle any errors that occur during the request
      console.error("Error fetching data:", error);
    }
  };

  const filteredPeople =
    query === ""
      ? auditors
      : auditors.filter((person: any) =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  const handleTitleChange = (event: any) => {
    setTitle(event.target.value);
  };
  const handleDescriptionChange = (event: any) => {
    setDescription(event.target.value);
  };
  const handleEndDateChange = (event: any) => {
    setEndDate(event);
  };
  const handleStartDateChange = (event: any) => {
    setStartDate(event);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    let requiredFields = [];

    if (!title) {
      requiredFields.push("Booking Title");
    }
    if (!factory) {
      requiredFields.push("factory empty");
      setFatoryError("Fatory is required");
    } else {
      setFatoryError("");
    }
    if (dataUser.length === 0) {
      requiredFields.push("auditor empty");
      setAuditError("auditors is required");
    } else {
      setAuditError("");
    }
    if (!startDate?.startDate) {
      requiredFields.push("Start Date");
      setStartDateError("Start date is required");
    } else {
      setStartDateError("");
    }

    if (!endDate?.endDate) {
      requiredFields.push("End Date");
      setEndDateError("End date is required");
    } else {
      setEndDateError("");
    }
    if (requiredFields.length > 0) {
      const emptyFieldsMessage = `Error Empty fields: ${requiredFields.join(
        ", "
      )}.`;
      setError(requiredFields);
      requiredFields = []; // Reset requiredFields to an empty array
      return;
    }

    const formData = {
      FactoryId: factory,
      AuditBy: selected?.id,
      Title: title,
      SubTitle: title,
      StartDate: startDate.startDate,
      EndDate: endDate.endDate,
      Description: description,
      BgColor: color,
      UserBookRequest: dataUser.map((value: any) => ({
        AuditorId: value.value,
      })),
    };

    try {
      const response = await axios.post("api/management/book", formData, {
        headers: {
          Authorization: FetchToken,
        },
      });
      // window.location.reload();
      localStorage.setItem('successMessage', 'Navigation to /management was successful');
      navigate("/management");
    } catch (error: any) {
      console.error("Error adding data:", error);
      const errorMessage = error.response.data.message;
      setError(errorMessage);
    }
  };
  const handlePickColor = (value: any) => {
    setColor(value);
  };
  const handleFactorySelection = (selectedFactory: any) => {
    setFactory(selectedFactory?.id);
  };
  const handleUserSelection = (selectedUser: any) => {
    setDataUser(selectedUser);
  };

  useEffect(() => {
    getDataFromBook();
  }, []);
  return (
    <>
      <form onSubmit={handleSubmit} className="p-3 pt-20">
        <div className="space-y-0 p-5 m-auto relative w-3/6">
          <div className="pb-0">
            <h1 className="text-base font-semibold leading-7 text-gray-900">
              BOOKING
            </h1>
            <h2 className="text-lg">{client}</h2>
            <h5>{standard}</h5>
            <h6>{status}</h6>
            <div className="mt-10  grid grid-cols-12 gap-x-6 gap-y-8 ">
              <div className="col-span-12">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Title<span className="text-red-500">*</span>
                </label>
                <div className="mt-2">
                  <input
                    readOnly
                    value={client}
                    onChange={handleTitleChange}
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="family-name"
                    className="border p-2 w-full"
                  />
                </div>
              </div>
              <div className="col-span-12 relative">
                <SelectFactory
                  factories={factories}
                  onFactorySelect={handleFactorySelection}
                />
                {factoryError && (
                  <div className="text-red-500 flex items-center space-x-1 pt-2">
                    <XCircleIcon className="w-5" />
                    <span className="text-red-500">{factoryError}</span>
                  </div>
                )}
              </div>
              <div className="col-span-12">
                <label
                  htmlFor="audit"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Auditor on duty<span className="text-red-500">*</span>
                </label>

                <div className="col-span-12">
                  <SelectMultiple
                    auditors={auditors}
                    onDataSelect={handleUserSelection}
                  />
                </div>
                {auditError && (
                  <div className="text-red-500 flex items-center space-x-1 pt-2">
                    <XCircleIcon className="w-5" />
                    <span className="text-red-500">{auditError}</span>
                  </div>
                )}
              </div>
              <div className="col-span-6">
                <label
                  htmlFor="start-date"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Start Date<span className="text-red-500">*</span>
                </label>
                <div className="border">
                  <Datepicker
                    useRange={false}
                    asSingle={true}
                    value={startDate}
                    onChange={handleStartDateChange}
                  />
                </div>
                {startDateError && (
                  <div className="text-red-500 flex items-center space-x-1 pt-2">
                    <XCircleIcon className="w-5" />
                    <span className="text-red-500">{startDateError}</span>
                  </div>
                )}
              </div>
              <div className="col-span-6">
                <label
                  htmlFor="postal-code"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  End Date<span className="text-red-500">*</span>
                </label>
                <div className="border">
                  <Datepicker
                    useRange={false}
                    asSingle={true}
                    value={endDate}
                    onChange={handleEndDateChange}
                  />
                </div>
                {endDateError && (
                  <div className="text-red-500 flex items-center space-x-1 pt-2">
                    <XCircleIcon className="w-5" />
                    <span className="text-red-500">{endDateError}</span>
                  </div>
                )}
              </div>
              <div className="space-x-2 col-span-6 flex  items-center">
                <label htmlFor="pick-color" className="font-medium">
                  Pick color
                </label>
                <input
                  onChange={(e) => handlePickColor(e.target.value)}
                  type="color"
                  value={"#ff9330"}
                />
              </div>

              <div className="col-span-12">
                <label
                  htmlFor="region"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    value={description}
                    onChange={handleDescriptionChange}
                    name="region"
                    id="region"
                    rows={3}
                    autoComplete="address-level1"
                    className="border w-full p-2"
                  ></textarea>
                </div>
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 col-span-6 text-white font-bold py-2 px-4 rounded mt-2"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
export default React.memo(BookCreateForm);
