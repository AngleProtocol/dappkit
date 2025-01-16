import type { ReactNode } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Button, Group, Icon, type IconProps, Text, mergeClass } from "../..";
import { boxStyles } from "./Box";
import type {State} from "../../theming/variables";
import "react-toastify/dist/ReactToastify.css";

export function NotificationText({ title, subtitle }: { title: ReactNode; subtitle: ReactNode }) {
  return (
    <Group size="xs" className="flex-col select-none grow">
      <Text look="bold" className="font-bold">
        {title}
      </Text>
      <Text size="xs">{subtitle}</Text>
    </Group>
  );
}

export function NotificationIcon({ className, ...props }: IconProps) {
  return (
    <Icon coloring={"harm"} className={mergeClass("ml-md text-main-11", className)} remix="RiSpam2Fill" {...props} />
  );
}

const NOTIFICATION_DURATION = 5 * 1000;

export type NotificationOptions = Parameters<typeof toast.promise>[1];
export type NotificationContent = {
  title: ReactNode;
  subtitle: ReactNode;
  icon?: IconProps;
  state?: State;
  loading?: boolean;
};

export class Notifier {
  id: string | number;
  content: NotificationContent;

  constructor(content: NotificationContent) {
    this.content = content;
    this.id = toast.loading(this.#content(), {
      hideProgressBar: true,
      icon: <Icon className="ml-md animate-spin" remix="RiLoader2Fill" />,
    });
  }

  #content() {
    return <NotificationText {...this.content} />;
  }

  update(content: Partial<NotificationContent>) {
    this.content = Object.assign(this.content, content);
    toast.update(this.id, {
      render: this.#content(),
      isLoading: content.loading,
      autoClose: !content.loading ? NOTIFICATION_DURATION : undefined,
      icon: <NotificationIcon coloring={content.state} {...content.icon} />,
      draggable: !content.loading,
      closeButton({ closeToast }) {
        if (content.loading) return;
        return (
          //TODO: fix the button so it has same padding in "soft" and remove "border-0"
          <Button look="base" className="border-0" onClick={closeToast}>
            <Icon remix="RiCloseFill" />
          </Button>
        );
      },
    });
  }

  static send({ title, subtitle, state, icon }: NotificationContent, options?: NotificationOptions) {
    return toast(<NotificationText {...{ title, subtitle }} />, {
      autoClose: 10 * 1000,
      closeButton({ closeToast }) {
        return (
          //TODO: fix the button so it has same padding in "soft" and remove "border-0"
          <Button look="base" className="border-0" onClick={closeToast}>
            <Icon remix="RiCloseCircleLine" />
          </Button>
        );
      },
      icon: <NotificationIcon coloring={state} {...icon} />,
      ...(options ?? {}),
    });
  }
}

export default function Notifications() {
  return (
    <ToastContainer
      stacked
      draggable
      draggablePercent={20}
      hideProgressBar={true}
      position="bottom-right"
      toastStyle={{ zIndex: 10000 }}
      toastClassName={mergeClass(boxStyles({ look: "bold" }), "flex-row")}
    />
  );
}
