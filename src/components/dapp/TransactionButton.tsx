import { type ReactNode, useCallback } from "react";
import { getTransactionReceipt } from "viem/actions";
import { type ResolvedRegister, type UseSendTransactionReturnType, useSendTransaction } from "wagmi";
import { Hash } from "../..";
import { useWalletContext } from "../../context/Wallet.context";
import Button, { type ButtonProps } from "../primitives/Button";
import Icon from "../primitives/Icon";
import List from "../primitives/List";
import { Notifier } from "../primitives/Notifications";
import Tooltip from "../primitives/Tooltip";

export type TransactionButtonProps = ButtonProps & {
  enableSponsorCheckbox?: boolean;
  tx?: Parameters<UseSendTransactionReturnType<ResolvedRegister["config"], unknown>["sendTransaction"]>["0"];
  name?: ReactNode;
  onExecute?: (hash: string) => void;
  onSuccess?: (hash: string) => void;
  onError?: (hash: string) => void;
};

export default function TransactionButton({
  tx,
  name,
  children,
  onExecute,
  onSuccess,
  enableSponsorCheckbox,
  onError,
  ...props
}: TransactionButtonProps) {
  const sendTxHook = useSendTransaction();
  const { status } = sendTxHook;
  const { address: user, chainId, client, sendTransaction, sponsorTransactions, setSponsorTransactions } = useWalletContext();
  const execute = useCallback(async () => {
    if (!tx || !user || !client) return;

    const notification = new Notifier({
      title: name,
      subtitle: "Sign transaction in your wallet",
      icon: { remix: "RiLoader2Fill" },
      loading: true,
    });

    try {
      const hash = await sendTransaction?.([
        {
          chain: client.chain,
          account: user,
          ...tx,
          // biome-ignore lint/suspicious/noExplicitAny: Todo wrong type @Clement
        } as any,
      ]);

      notification.update({
        subtitle: (
          <>
            Transaction{" "}
            <Hash value format="short">
              {hash}
            </Hash>{" "}
            sent
          </>
        ),
        loading: true,
      });

      hash && onExecute?.(hash);

      if (!hash) return;
      const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

      let receipt = null;
      while (receipt === null) {
        try {
          const res = await getTransactionReceipt(client, { hash });
          receipt = res;
        } catch {
          delay(1000);
        }
      }

      if (receipt.status === "reverted") {
        onError?.(hash);
        notification.update({
          subtitle: (
            <>
              Transaction{" "}
              <Hash value format="short">
                {hash}
              </Hash>{" "}
              reverted
            </>
          ),
          icon: { remix: "RiSpam2Fill" },
          state: "harm",
          loading: false,
        });
      } else if (receipt.status === "success") {
        onSuccess?.(hash);
        notification.update({
          subtitle: (
            <>
              Transaction{" "}
              <Hash value format="short">
                {hash}
              </Hash>{" "}
              succeeded
            </>
          ),
          icon: { remix: "RiCheckboxCircleLine" },
          state: "good",
          loading: false,
        });
      }
    } catch (_error) {
      console.error(_error);
      notification.update({
        subtitle: "Transaction Rejected",
        icon: { remix: "RiFileWarningLine" },
        state: "warn",
        loading: false,
      });
    }
  }, [tx, client, user, sendTransaction, onExecute, onSuccess, onError, name]);

  //TODO: remove hardcoded chainId check in favor of more integrated and generic implem
  if (enableSponsorCheckbox && chainId === 324)
    return (
      <List flex="row" {...{size: props.size, look: props.look}}>
        <Button {...props} onClick={execute}>
          {children}
          {status === "pending" && <Icon className="animate-spin" remix="RiLoader2Line" />}
        </Button>
        {
          <Button onClick={() => setSponsorTransactions(s => !s)} look="hype">
            <Tooltip icon={false} helper={<>Enable sponsoring of the transaction</>}>
              <Icon remix={sponsorTransactions ? "RiCheckboxCircleLine" : "RiCheckboxBlankCircleLine"} />
            </Tooltip>
          </Button>
        }
      </List>
    );
  return (
    <Button {...props} onClick={execute}>
      {children}
      {status === "pending" && <Icon className="animate-spin" remix="RiLoader2Line" />}
    </Button>
  );
}
