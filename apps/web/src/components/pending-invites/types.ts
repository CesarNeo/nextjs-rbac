enum InviteStatusEnum {
  ACCEPT = 'accept',
  REJECT = 'reject',
}

type AcceptOrRejectInviteType =
  | InviteStatusEnum.ACCEPT
  | InviteStatusEnum.REJECT

interface IAcceptOrRejectInviteProps {
  inviteId: string
  type: AcceptOrRejectInviteType
}

export type { IAcceptOrRejectInviteProps, AcceptOrRejectInviteType }
export { InviteStatusEnum }
