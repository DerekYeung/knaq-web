import React from 'react'
import { Col, Row, Table } from 'react-bootstrap'

const WalletHistory = () => {

    const transactions = [
        { received: true, type: "", subject: "BSV Address", time: "10m", amount: "20.00", feather: false },
        { received: true, type: "Tip", subject: "@mark.media", time: "22m", amount: "4.28", feather: false },
        { received: true, type: "Tip", subject: "@anna_edwards", time: "25m", amount: "500", feather: true },
        { received: true, type: "Subscription", subject: "@andrea_cole", time: "34m", amount: "10.00", feather: false },
        { received: false, type: "Tip", subject: "@jessica.lee23", time: "1h", amount: "3.00", feather: false },
        { received: true, type: "Referal", subject: "@andrew.reynolds", time: "2h", amount: "5.00", feather: false },
        { received: false, type: "Tip", subject: "@melissa_kim", time: "1d", amount: "1000", feather: true },
    ]

    return (
        <div className="mt-3">
            <h5><strong>Transaction History</strong></h5>
            <Table size="sm">
                {
                    transactions.map(trans => (
                        <tbody>
                            <tr>
                                <td className="text-muted p-1 align-middle">{trans.time}</td>
                                <td className='p-1'>
                                    {trans.received ? "Received " : "Sent "}
                                    <span style={{
                                        fontWeight: "600",
                                        color: trans.type === "Tip" && trans.feather == false ? "orange"
                                            : trans.type === "Tip" && trans.feather == true ? "purple"
                                                : trans.type === "Subscription" && trans.feather == false ? "blue"
                                                    : trans.type === "Subscription" && trans.feather == true ? "purple"
                                                        : trans.type === "Referal" ? "green"
                                                            : ""
                                    }}
                                    >{trans.type}</span>
                                    {trans.received ? " from " : " to "}
                                    <strong>{trans.subject}</strong>
                                </td>
                                <td className={trans.received ? "text-success p-1 align-middle" : "text-danger p-1 align-middle"}
                                    style={{ whiteSpace: "nowrap" }}>
                                    {trans.received ? "+" : "-"}
                                    {!trans.feather && "$"}
                                    {trans.amount}
                                    {trans.feather && <i className="fas fa-feather ml-1" style={{ fontSize: "10px" }} />}
                                </td>
                            </tr>
                        </tbody>
                    ))}
            </Table>
        </div>
    )
}

export default WalletHistory
