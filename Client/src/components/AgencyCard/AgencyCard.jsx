import { Card, CardHeader, CardBody, CardFooter, Divider, Avatar, Chip, LinkIcon, Tooltip } from "@nextui-org/react";
import { useLocation } from "react-router-dom";
import { Button, useDisclosure, Link, Modal, ModalContent, Accordion, AccordionItem, ModalHeader, ModalBody, ModalFooter, Input, Textarea, SelectItem, Select } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";
import axios from '../api/axiosConfig.js';
import { ScrollShadow } from "@nextui-org/react";
import "../pages/styles/Community.css";
import { FaRegCopy } from "react-icons/fa";

export default function AgencyCard({agency}) {
    const location = useLocation();
    const route = location.pathname;
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { isOpen: isRulesOpen, onOpen: onRulesOpen, onOpenChange: onRulesOpenChange } = useDisclosure();
    const { isOpen: isMembersOpen, onOpen: onMemberOpen, onOpenChange: onMemberOpenChange } = useDisclosure();

    useEffect(() => {

    }, [])

    const handleRulesInput = (e) => {
    }


    const handleJoinAgency = async () => {
    }

    return (
        <>
            {/* <ToastContainer position="top-center"/> */}
            <Card className="w-[350px] h-[250px] p-2 m-4 bg-[#cfc6e2]">
                <CardHeader className="flex justify-between" color="foreground">
                    <div className="flex gap-4 items-center" >
                        <Avatar
                            alt="community-card"
                            height={40}
                            radius="sm"
                            name={"avatar"}
                            width={40}
                            isBordered
                            className="bg-[#bd7fce]"
                        />
                        <div className="flex flex-col ">
                            {/* <p className="text-base font-bold text-xl">{community.communityName}</p> */}
                            {/* <p className="text-small text-default-500">nextui.org</p> */}
                        </div>
                    </div>
                    {/* <div>
                        <IoMdInformationCircleOutline onPress={onRulesOpen} />
                    </div> */}
                    <Button color="secondary" className="font-bold" variant="bordered" size="md" onPress={onRulesOpen}>
                        Rules
                    </Button>
                    {/* <Chip variant="bordered" startContent={<FaHashtag />}>
                        {community.communityId}
                    </Chip> */}
                </CardHeader>
                <Divider />
                <CardFooter className="flex justify-between">
                    {/* <Button variant="bordered" size="md" onPress={onOpen} isDisabled={community.joined} style={{ border: "2px solid #8f9fe8", cursor: community.joined ? "not-allowed" : "pointer", pointerEvents: community.joined ? "all" : "" }} >
                        <span className="font-bold" style={{ color: "#8f9fe8" }}>
                            {community.joined ? "Joined" : "Join"}
                        </span>
                    </Button> */}
                </CardFooter>
                <Modal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    placement="top-center"
                    classNames={{
                        body: "py-6",
                        backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
                        base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
                        header: "border-b-[1px] border-[#292f46]",
                        closeButton: "hover:bg-white/5 active:bg-white/10",
                    }}
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">Verify Community Details</ModalHeader>
                                <ModalBody>
                                    <Input
                                        label="Email"
                                        placeholder="Enter your email"
                                        name="email"
                                        onChange={handleRulesInput}
                                    />
                                    <Select
                                        label="Select region"
                                        name="region"
                                        onChange={handleRulesInput}
                                    >
                                        <SelectItem value="asia-pacific" key="AP">
                                            Asia Pacific
                                        </SelectItem>
                                        <SelectItem value="north-america" key="NA">
                                            North America
                                        </SelectItem>
                                        <SelectItem value="europe" key="EU">
                                            Europe
                                        </SelectItem>
                                        <SelectItem value="middle-east" key="ME">
                                            Middle East
                                        </SelectItem>
                                        <SelectItem value="all" key="AL">
                                            All
                                        </SelectItem>
                                    </Select>
                                    <Select
                                        label="Select gender"
                                        name="gender"
                                        onChange={handleRulesInput}
                                    >
                                        <SelectItem value="male" key="M">
                                            Male
                                        </SelectItem>
                                        <SelectItem value="female" key="F">
                                            Female
                                        </SelectItem>
                                        <SelectItem value="both" key="MF">
                                            Both
                                        </SelectItem>
                                    </Select>
                                </ModalBody>
                                <ModalFooter>
                                    <Button onClick={handleJoinAgency} color="primary" onPress={onClose}>
                                        Enroll in Agency
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
                <Modal isOpen={isMembersOpen} onOpenChange={onMemberOpenChange} classNames={{
                    body: "py-1",
                    backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
                    base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
                    header: "border-b-[1px] border-[#292f46]",
                    closeButton: "hover:bg-white/5 active:bg-white/10",
                }}>
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1 text-xl font-bold">Community members</ModalHeader>
                                <ScrollShadow hideScrollBar className="w-[400px] h-[150px]">
                                    {/* {allUserFromCommunity.map((members, index) => (
                                        <ModalBody key={index}>
                                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: "1rem", justifyContent: "center" }}>
                                                <Input
                                                    label="User ID"
                                                    style={{ fontSize: "15px" }}
                                                    value={members._id}
                                                    readOnly
                                                    className="pt-2"
                                                />
                                                <Tooltip content="Copy to clipboard">
                                                    <Button
                                                        color="primary"
                                                        isIconOnly
                                                        onClick={() => {
                                                            navigator.clipboard.writeText(
                                                                members._id
                                                            );
                                                        }}>
                                                        <FaRegCopy />
                                                    </Button>
                                                </Tooltip>
                                            </div>
                                        </ModalBody>
                                    ))} */}
                                </ScrollShadow>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </Card>
            {/* <ToastContainer
                position="top-center"
            /> */}
        </>
    )
}