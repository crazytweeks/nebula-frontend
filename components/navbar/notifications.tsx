"use client";

import React, { useEffect, useState } from "react";
import { Badge } from "@nextui-org/badge";
import { Button } from "@nextui-org/button";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/modal";

import { cn } from "@/lib/utils";
import { IconBell } from "../icons/bell";
import { IconNotifications } from "../icons/notification";
import TimeAgo from "../timeAgo";

const EachNotificationItem = ({ date }: Notification) => {
  return (
    <div
      className=" 
      flex
      flex-row items-center
      justify-between
      border-b
      border-gray-100
      align-middle

      hover:cursor-pointer
    
      hover:bg-gray-100
      dark:border-gray-700

      dark:hover:bg-gray-700

      dark:hover:text-white
      
    "
    >
      <div className="flex items-center  px-4 py-3">
        <IconBell height={24} width={24} />
        <p
          className="mx-2 flex flex-row text-sm text-gray-600
        dark:text-white
      "
        >
          <span className="font-bold">{"Bhuvan Bm"}</span>
          {": created an account"}
          <span className="ml-1 text-blue-500 hover:underline">{"Admin"}</span>
        </p>
      </div>

      <Badge placement="bottom-left" content="new" color="danger" size="sm">
        {date && <TimeAgo timeStamp={date} />}
      </Badge>
    </div>
  );
};

type Notification = {
  title: string;
  description?: string;
  url?: string;
  image?: string;
  date?: Date;
  id?: string;
  read?: boolean;
};

const Notifications = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [notifications, setNotifications] = useState<Notification[]>();

  useEffect(() => {
    const interval = setTimeout(() => {
      const newNotification = {
        title: "New Notification",
        description: "You have a new notification",
        url: "#",
        image:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
        date: new Date(),
      };

      setNotifications((prevNotifications) => [
        ...(prevNotifications ? prevNotifications : []),
        newNotification,
      ]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Button
        onClick={onOpen}
        isIconOnly
        className={cn(
          "hover:bg-transparent",
          "bg-transparent",
          "duration-300 ease-in-out hover:scale-110 hover:transition"
        )}
      >
        <IconNotifications
          height={24}
          width={24}
          className={cn("text-default-500", "hover:text-default-600")}
        />
      </Button>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        size={"2xl"}
        onOpenChange={onOpenChange}
        classNames={{
          backdrop: cn(
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20"
          ),
          wrapper: "p-0",
        }}
        placement="auto"
      >
        <ModalContent>
          {(onClose) => (
            <div className={cn("pt-12")}>
              {notifications?.map((notification, index) => (
                <EachNotificationItem key={index} {...notification} />
              ))}

              <div className="flex flex-row justify-between space-y-3 px-4">
                <Button
                  size="sm"
                  className="m-2 align-middle
                text-sm text-gray-500 hover:text-gray-600
                dark:text-gray-300 dark:hover:text-gray-400
                
                "
                >
                  Mark all as read
                </Button>
                <Button
                  size="sm"
                  className="m-2 align-middle
                text-sm text-gray-500 hover:text-gray-600
                dark:text-gray-300 dark:hover:text-gray-400
                
                "
                >
                  Mark all as read
                </Button>
              </div>
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Notifications;
