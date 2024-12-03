import { type ReactNode, useCallback } from "react";
import { type ResolvedRegister, type UseSendTransactionReturnType, useSendTransaction } from "wagmi";
import Dropdown from "../extenders/Dropdown";
import Button, { type ButtonProps } from "../primitives/Button";
import TransactionHelper from "./TransactionHelper";

export type TransactionButtonProps = ButtonProps & {
  tx?: Parameters<UseSendTransactionReturnType<ResolvedRegister["config"], unknown>["sendTransaction"]>["0"];
  name?: ReactNode;
};

export default function TransactionButton({ tx, name, ...props }: TransactionButtonProps) {
  const sendTxHook = useSendTransaction();
  const { sendTransaction } = sendTxHook;

  const execute = useCallback(() => {
    if (!tx) return;

    sendTransaction({
      to: tx.to as `0x${string}`,
      data: tx.data as `0x${string}`,
    });
  }, [tx, sendTransaction]);

  return (
    <Dropdown className="[&>*]:grow flex" content={<TransactionHelper execute={execute} {...sendTxHook} />}>
      <Button {...props} onClick={execute} />
    </Dropdown>
  );
}
