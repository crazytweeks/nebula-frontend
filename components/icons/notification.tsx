// icon:notifications-circle | Ionicons https://ionicons.com/ | Ionic Framework
import * as React from 'react';

function IconNotificationsCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="currentColor"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm0 336c-20.9 0-37.52-8.86-39.75-27.58a4 4 0 014-4.42h71.45a4 4 0 014 4.48C293.15 374.85 276.68 384 256 384zm98-48H158c-11.84 0-18-15-11.19-23 16.33-19.34 27.87-27.47 27.87-80.8 0-48.87 25.74-66.21 47-74.67a11.35 11.35 0 006.33-6.68C231.7 138.6 242.14 128 256 128s24.28 10.6 28 22.86a11.39 11.39 0 006.34 6.68c21.21 8.44 47 25.81 47 74.67 0 53.33 11.53 61.46 27.86 80.8 6.74 7.99.57 22.99-11.2 22.99z" />
    </svg>
  );
}

function IconNotifications(props: React.SVGProps<SVGSVGElement>) {
  return (
    <div
      className="transform cursor-pointer text-gray-500 duration-300
      ease-in-out
      hover:scale-110
      hover:text-gray-400
      "
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        height="1em"
        width="1em"
        {...props}
      >
        <path
          d="M12 22C10.8954 22 10 21.1046 10 20H14C14 21.1046 13.1046 22 12 22ZM20 19H4V17L6 16V10.5C6 7.038 7.421 4.793 10 4.18V2H13C12.3479 2.86394 11.9967 3.91762 12 5C12 5.25138 12.0187 5.50241 12.056 5.751H12C10.7799 5.67197 9.60301 6.21765 8.875 7.2C8.25255 8.18456 7.94714 9.33638 8 10.5V17H16V10.5C16 10.289 15.993 10.086 15.979 9.9C16.6405 10.0366 17.3226 10.039 17.985 9.907C17.996 10.118 18 10.319 18 10.507V16L20 17V19ZM17 8C16.3958 8.00073 15.8055 7.81839 15.307 7.477C14.1288 6.67158 13.6811 5.14761 14.2365 3.8329C14.7919 2.5182 16.1966 1.77678 17.5954 2.06004C18.9942 2.34329 19.9998 3.5728 20 5C20 6.65685 18.6569 8 17 8Z"
          fill="currentColor"
        ></path>
      </svg>
    </div>
  );
}

export { IconNotifications, IconNotificationsCircle };
