import { Fragment, useEffect, useRef, useState } from "react";
import axios from "axios";
import { LayoutManagement } from "../layout-management";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import { NavItem, NavLink } from "reactstrap";
import { BookModal } from "./Book/book-modal";
export const ProjectApp: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [projectId, setProjectId] = useState("");
  const [client, setClient] = useState("");
  const [standard, setStandard] = useState("");
  const [project, setProject] = useState([]);
  const [users, setUsers] = useState([]);
  const openModal = (projectId:any, standard:any, client:any, users: any) =>{
    setOpen(true);
    setProjectId(projectId);
    setStandard(standard);
    setClient(client)
    setUsers(users)
  }
  const getProjectData = async () => {
    try {
      const response = await axios.get("api/management/project");
      setProject(response.data);
      console.log(response.data);
    } catch (error) {}
  };
  useEffect(() => {
    getProjectData();
  }, []);
  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <>
      <LayoutManagement>
        <h1 className="uppercase pb-8 pt-20 px-4">Projects Information</h1>
        <div className="border overflow-x-auto w-full h-4/5">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-60">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50  dark:text-gray-400">
              <tr className="w-full">
                <th scope="col" className="px-6 py-3 text-center">
                  No
                </th>
                <th scope="col" className="pe-28 py-3">
                  Client
                </th>
                <th scope="col" className="pe-40 py-3">
                  Standard
                </th>
                <th className="pe-20 py-3 flex-nowrap">IDFLCode</th>
                <th scope="col" className="pe-20 py-3">
                  license No
                </th>
                <th scope="col" className="pe-20 py-3">
                  Issued Certificate date
                </th>

                <th scope="col" className="pe-20 py-3">
                  Expired Certificated
                </th>

                <th scope="col" className="pe-20 py-3">
                  status
                </th>
                <th scope="col" className="pe-10 py-3">
                  Issued Certification
                </th>
                <th scope="col" className="pe-10 py-3">
                  Another Certification
                </th>
                <th scope="col" className="pe-10 py-3">
                  Initial Certification
                </th>
                <th scope="col" className="pe-10 py-3">
                  Renewal Certification
                </th>
                <th scope="col" className="pe-10 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {project.map((items: any, index: any) => (
                <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <td className="px-10 py-3 text-center">{index}</td>
                  <td className="py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {items.client}
                  </td>
                  <td className="py-3">{items.standard}</td>
                  <td className="py-3">{items.idflCode}</td>
                  <td className="py-3">{items.licenseNo}</td>
                  <td className="py-3">{items.issueCertificatedDate}</td>
                  <td className="py-3">{items.certificationExpirationDate}</td>
                  <td className="py-3">{items.status}</td>
                  <td className="py-3">
                    <input
                      readOnly
                      type="checkbox"
                      checked={items.issueCertificated === true ? true : false}
                    />
                  </td>
                  <td className="py-3">
                    <input
                      readOnly
                      type="checkbox"
                      checked={
                        items.isAnotherCertification === true ? true : false
                      }
                    />
                  </td>

                  <td className="py-3">
                    <input
                      readOnly
                      type="checkbox"
                      checked={
                        items.isInitialCertification === true ? true : false
                      }
                    />
                  </td>
                  <td className="py-3">
                    <input
                      readOnly
                      type="checkbox"
                      checked={
                        items.isRenewalCertification === true ? true : false
                      }
                    />
                  </td>
                  <td>
                    <Menu  as="div" className="relative inline-block text-left">
                      <div>
                        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-mdpx-3 py-2 text-sm font-semibold text-gray-900">
                          <EllipsisHorizontalIcon className="h-6 w-6 text-blue-500" />
                        </Menu.Button>
                      </div>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <ul className="py-1 navbar-nav ">
                            <Menu.Item>
                              {({ active }) => (
                                <NavItem>
                                  <NavLink
                                    className={classNames(
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700",
                                      "block px-4 py-2 text-sm"
                                    )}
                                    onClick={()=> openModal(items.id, items.standard, items.client, items.users)}
                                  >
                                    Book                                
                                  </NavLink>
                                </NavItem>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <NavItem>
                                  <NavLink
                                    className={classNames(
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700",
                                      "block px-4 py-2 text-sm"
                                    )}
                                  >
                                    View
                                  </NavLink>
                                </NavItem>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <NavItem>
                                  <NavLink
                                    className={classNames(
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700",
                                      "block px-4 py-2 text-sm"
                                    )}
                                  >
                                    Edit
                                  </NavLink>
                                </NavItem>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <NavItem>
                                  <NavLink
                                    className={classNames(
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700",
                                      "block px-4 py-2 text-sm"
                                    )}
                                  >
                                    Cancel book
                                  </NavLink>
                                </NavItem>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <NavItem>
                                  <NavLink
                                    className={classNames(
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700",
                                      "block px-4 py-2 text-sm"
                                    )}
                                  >
                                    Delete
                                  </NavLink>
                                </NavItem>
                              )}
                            </Menu.Item>
                          </ul>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <BookModal  open={open} setOpen={setOpen} projectId={projectId} standard={standard} client={client} users={users}/>
        </div>
      </LayoutManagement>
    </>
  );
};