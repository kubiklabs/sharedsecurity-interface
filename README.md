# Shared Security Interface

The shared security interface, developed by Kubik Labs, is a unified interface to view, manage and interact with the ICS aspect of all the chain opted-in. Currently there are two chains in the ICS: Neutron and Stride, along with Cosmos Hub which provides its $2.3b marjket cap to secure the consumer chains. There are 5 main pages which provide the data related to the shared-security.

- **Overview**: Provides the insights and quick stats of the chains with the graphical data.
- **Atom Economic Zone**: Provides the insights of the community. Displays upcoming community calls, consumer chains and their proposals(if any) and the assets available.
- **Governance**: All the governance proposals on Cosmos Hub and the consumer chains, seperated by appropriate tags. See details for any proposal or cast you vote.
- **Assets**: All assets of the consumer chains along with the amount.
- **Validators**: All validators validating Cosmos Hub and the consumer chains.

The data flow of the data from the chain to the Governance Page UI is explained as an example in the diagram below.

![DFD](src/assets//dfd//gov-page-dataflow.png)

## Overview

![Overview](src/assets/snapshots/overview.png)

## Atom Economic Zone(AEZ)

![Ecosystem](src/assets//snapshots/aez.png)

## Governance

![Live Proposals](src/assets/snapshots/gov-live.png)

![Legacy Proposals](src/assets/snapshots/gov-leg.png)

![Single Live Proposal](src/assets/snapshots/lp.png)

## Assets

![Assets](src/assets/snapshots/assets.png)

## Validators

![Validators](src/assets/snapshots/validators.png)
