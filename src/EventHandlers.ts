/*
 *Please refer to https://docs.envio.dev for a thorough guide on all Envio indexer features*
 */
import {
  StarknetEthBridgeContract_LogDeposit_loader,
  StarknetEthBridgeContract_LogDeposit_handler,
  StarknetEthBridgeContract_LogDepositCancelRequest_loader,
  StarknetEthBridgeContract_LogDepositCancelRequest_handler,
  StarknetEthBridgeContract_LogDepositReclaimed_loader,
  StarknetEthBridgeContract_LogDepositReclaimed_handler,
  StarknetEthBridgeContract_LogNewGovernorAccepted_loader,
  StarknetEthBridgeContract_LogNewGovernorAccepted_handler,
  StarknetEthBridgeContract_LogNominatedGovernor_loader,
  StarknetEthBridgeContract_LogNominatedGovernor_handler,
  StarknetEthBridgeContract_LogRemovedGovernor_loader,
  StarknetEthBridgeContract_LogRemovedGovernor_handler,
  StarknetEthBridgeContract_LogSetL2TokenBridge_loader,
  StarknetEthBridgeContract_LogSetL2TokenBridge_handler,
  StarknetEthBridgeContract_LogSetMaxDeposit_loader,
  StarknetEthBridgeContract_LogSetMaxDeposit_handler,
  StarknetEthBridgeContract_LogSetMaxTotalBalance_loader,
  StarknetEthBridgeContract_LogSetMaxTotalBalance_handler,
  StarknetEthBridgeContract_LogWithdrawal_loader,
  StarknetEthBridgeContract_LogWithdrawal_handler,
} from "../generated/src/Handlers.gen";

import {
  LogDepositEntity,
  LogDepositCancelRequestEntity,
  LogDepositReclaimedEntity,
  LogNewGovernorAcceptedEntity,
  LogNominatedGovernorEntity,
  LogRemovedGovernorEntity,
  LogSetL2TokenBridgeEntity,
  LogSetMaxDepositEntity,
  LogSetMaxTotalBalanceEntity,
  LogWithdrawalEntity,
  EventsSummaryEntity,
} from "./src/Types.gen";

const GLOBAL_EVENTS_SUMMARY_KEY = "GlobalEventsSummary";

const INITIAL_EVENTS_SUMMARY: EventsSummaryEntity = {
  id: GLOBAL_EVENTS_SUMMARY_KEY,
  logDepositsCount: BigInt(0),
  logDepositCancelRequestsCount: BigInt(0),
  logDepositReclaimedsCount: BigInt(0),
  logNewGovernorAcceptedsCount: BigInt(0),
  logNominatedGovernorsCount: BigInt(0),
  logRemovedGovernorsCount: BigInt(0),
  logSetL2TokenBridgesCount: BigInt(0),
  logSetMaxDepositsCount: BigInt(0),
  logSetMaxTotalBalancesCount: BigInt(0),
  logWithdrawalsCount: BigInt(0),
};

StarknetEthBridgeContract_LogDeposit_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

StarknetEthBridgeContract_LogDeposit_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    logDepositsCount: currentSummaryEntity.logDepositsCount + BigInt(1),
  };

  let logDepositEntity: LogDepositEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    sender: event.params.sender,
    amount: event.params.amount,
    l2Recipient: event.params.l2Recipient,
    nonce: event.params.nonce,
    fee: event.params.fee,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.LogDeposit.set(logDepositEntity);
});

StarknetEthBridgeContract_LogDepositCancelRequest_loader(
  ({ event, context }) => {
    context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
  }
);

StarknetEthBridgeContract_LogDepositCancelRequest_handler(
  ({ event, context }) => {
    let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

    let currentSummaryEntity: EventsSummaryEntity =
      summary ?? INITIAL_EVENTS_SUMMARY;

    let nextSummaryEntity = {
      ...currentSummaryEntity,
      logDepositCancelRequestsCount:
        currentSummaryEntity.logDepositCancelRequestsCount + BigInt(1),
    };

    let logDepositCancelRequestEntity: LogDepositCancelRequestEntity = {
      id: event.transactionHash + event.logIndex.toString(),
      sender: event.params.sender,
      amount: event.params.amount,
      l2Recipient: event.params.l2Recipient,
      nonce: event.params.nonce,
      eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
    };

    context.EventsSummary.set(nextSummaryEntity);
    context.LogDepositCancelRequest.set(logDepositCancelRequestEntity);
  }
);

StarknetEthBridgeContract_LogDepositReclaimed_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

StarknetEthBridgeContract_LogDepositReclaimed_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    logDepositReclaimedsCount:
      currentSummaryEntity.logDepositReclaimedsCount + BigInt(1),
  };

  let logDepositReclaimedEntity: LogDepositReclaimedEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    sender: event.params.sender,
    amount: event.params.amount,
    l2Recipient: event.params.l2Recipient,
    nonce: event.params.nonce,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.LogDepositReclaimed.set(logDepositReclaimedEntity);
});

StarknetEthBridgeContract_LogNewGovernorAccepted_loader(
  ({ event, context }) => {
    context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
  }
);

StarknetEthBridgeContract_LogNewGovernorAccepted_handler(
  ({ event, context }) => {
    let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

    let currentSummaryEntity: EventsSummaryEntity =
      summary ?? INITIAL_EVENTS_SUMMARY;

    let nextSummaryEntity = {
      ...currentSummaryEntity,
      logNewGovernorAcceptedsCount:
        currentSummaryEntity.logNewGovernorAcceptedsCount + BigInt(1),
    };

    let logNewGovernorAcceptedEntity: LogNewGovernorAcceptedEntity = {
      id: event.transactionHash + event.logIndex.toString(),
      acceptedGovernor: event.params.acceptedGovernor,
      eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
    };

    context.EventsSummary.set(nextSummaryEntity);
    context.LogNewGovernorAccepted.set(logNewGovernorAcceptedEntity);
  }
);

StarknetEthBridgeContract_LogNominatedGovernor_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

StarknetEthBridgeContract_LogNominatedGovernor_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    logNominatedGovernorsCount:
      currentSummaryEntity.logNominatedGovernorsCount + BigInt(1),
  };

  let logNominatedGovernorEntity: LogNominatedGovernorEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    nominatedGovernor: event.params.nominatedGovernor,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.LogNominatedGovernor.set(logNominatedGovernorEntity);
});

StarknetEthBridgeContract_LogRemovedGovernor_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

StarknetEthBridgeContract_LogRemovedGovernor_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    logRemovedGovernorsCount:
      currentSummaryEntity.logRemovedGovernorsCount + BigInt(1),
  };

  let logRemovedGovernorEntity: LogRemovedGovernorEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    removedGovernor: event.params.removedGovernor,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.LogRemovedGovernor.set(logRemovedGovernorEntity);
});

StarknetEthBridgeContract_LogSetL2TokenBridge_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

StarknetEthBridgeContract_LogSetL2TokenBridge_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    logSetL2TokenBridgesCount:
      currentSummaryEntity.logSetL2TokenBridgesCount + BigInt(1),
  };

  let logSetL2TokenBridgeEntity: LogSetL2TokenBridgeEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    value: event.params.value,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.LogSetL2TokenBridge.set(logSetL2TokenBridgeEntity);
});

StarknetEthBridgeContract_LogSetMaxDeposit_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

StarknetEthBridgeContract_LogSetMaxDeposit_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    logSetMaxDepositsCount:
      currentSummaryEntity.logSetMaxDepositsCount + BigInt(1),
  };

  let logSetMaxDepositEntity: LogSetMaxDepositEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    value: event.params.value,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.LogSetMaxDeposit.set(logSetMaxDepositEntity);
});

StarknetEthBridgeContract_LogSetMaxTotalBalance_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

StarknetEthBridgeContract_LogSetMaxTotalBalance_handler(
  ({ event, context }) => {
    let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

    let currentSummaryEntity: EventsSummaryEntity =
      summary ?? INITIAL_EVENTS_SUMMARY;

    let nextSummaryEntity = {
      ...currentSummaryEntity,
      logSetMaxTotalBalancesCount:
        currentSummaryEntity.logSetMaxTotalBalancesCount + BigInt(1),
    };

    let logSetMaxTotalBalanceEntity: LogSetMaxTotalBalanceEntity = {
      id: event.transactionHash + event.logIndex.toString(),
      value: event.params.value,
      eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
    };

    context.EventsSummary.set(nextSummaryEntity);
    context.LogSetMaxTotalBalance.set(logSetMaxTotalBalanceEntity);
  }
);

StarknetEthBridgeContract_LogWithdrawal_loader(({ event, context }) => {
  context.EventsSummary.load(GLOBAL_EVENTS_SUMMARY_KEY);
});

StarknetEthBridgeContract_LogWithdrawal_handler(({ event, context }) => {
  let summary = context.EventsSummary.get(GLOBAL_EVENTS_SUMMARY_KEY);

  let currentSummaryEntity: EventsSummaryEntity =
    summary ?? INITIAL_EVENTS_SUMMARY;

  let nextSummaryEntity = {
    ...currentSummaryEntity,
    logWithdrawalsCount: currentSummaryEntity.logWithdrawalsCount + BigInt(1),
  };

  let logWithdrawalEntity: LogWithdrawalEntity = {
    id: event.transactionHash + event.logIndex.toString(),
    recipient: event.params.recipient,
    amount: event.params.amount,
    eventsSummary: GLOBAL_EVENTS_SUMMARY_KEY,
  };

  context.EventsSummary.set(nextSummaryEntity);
  context.LogWithdrawal.set(logWithdrawalEntity);
});
