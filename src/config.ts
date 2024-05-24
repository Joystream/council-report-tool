export const QN_URL =
  import.meta.env.VITE_QN_URL || "https://query.joystream.org/graphql";
export const ORION_URL =
  import.meta.env.VITE_ORION_URL || "https://orion.gleev.xyz/graphql";
export const NODE_SOCKET =
  import.meta.env.VITE_NODE_SOCKET || "wss://rpc.joystream.org:9944";
export const FEE_QN_URL = "https://monitoring.joyutils.org/fees/graphql";
export const MEXC_WALLET = "5CFYPwkpP4oEeCUviVafWBNwpRPF7SjUpL4q8A7KtJJhQ1gJ";
export const defaultDateTimeFormat = "DD MMMM YYYY";
export const proposalLink = "https://pioneerapp.xyz/#/proposals/preview/";
export const weeklyReportTemplateWithMediaStatus = `
**_general_startBlock_timestamp - _general_endBlock_timestamp**
- Start Block: _general_startBlock_number 
- End Block: _general_endBlock_number

# Tokenomics

- Total supply: **_supply_totalSupply JOY**
- JOY inflation (since mainnet launch): **_supply_inflationChanged %**
- Circulating supply:  **_supply_circulatingSupply JOY**
- Weekly Tokens Minted: **_supply_mintedToken JOY**
- Weekly Tokens Burned: **(_supply_burnedToken) JOY**

MEXC exchange wallet:

- Balance:  **_mexc_endBlock JOY**
- Weekly Balance change: **_mexc_changedBalance JOY**

DAO Spending:

- Start Issuance: **_daoSpending_startIssuance JOY**
- End Issuance: **_daoSpending_endIssuance JOY**
- Total minted (net): **_daoSpending_mintedToken JOY**

*including:*

- Council rewards: **_daoSpending_councilReward JOY**
- WG spent: **_daoSpending_wgSpent JOY**
- Funding proposals: **_daoSpending_fundingProposals JOY**
- Creator payout: **_daoSpending_creatorPayoutRewards JOY**
- Validator rewards: **_daoSpending_validatorRewards JOY**
- Fees and token burn: **(_supply_burnedToken) JOY**

# **Content**

### Videos

- Total Videos, qty: **_videos_endBlock**
- Weekly Videos Growth, qty: **_videos_growthQty**
- Weekly Videos Growth, %: **_videos_growthPct%**

![_graph_videosChart](_graph_videosChart)

### Channels

Provided stats below are for non-empty channels only:

- Total Channels, qty:  **_nonEmptyChannel_endBlock**
- Weekly Channels Growth, qty: **_nonEmptyChannel_growthQty**
- Weekly Channels Growth, **_nonEmptyChannel_growthPct%**

![_graph_nonEmptyChannelChart](_graph_nonEmptyChannelChart)

### Media Storage

- Total Storage Used: **_mediaStorage_endBlock GB**
- Weekly Storage Used Growth: **_mediaStorage_growthQty GB**
- Weekly Storage Used Growth, %: **_mediaStorage_growthPct%**

![_graph_mediaStorageChart](_graph_mediaStorageChart)

### Video NFTs

- Total NFT: **_videoNFTs_endBlock**
- Weekly NFT Growth: **_videoNFTs_growthQty**
- Weekly NFT Growth, %: **_videoNFTs_growthPct %**
- Weekly NFT sold: _videoNFTs_soldQty

![_graph_videoNftChart](_graph_videoNftChart)

### Creator tokens

- Total market cap: **_crt_totalMCap JOY**
- Weekly cumulative trading volume: **_crt_cumulativeGrowth  JOY**
- Newly minted : **_crt_newlyMinted JOY**
- Total revenue shares amount: **_crt_totalRevenueShares JOY**

![_graph_videoNftChart](_graph_CrtChart)

# **Membership**

- Total Membership Accounts: **_membership_endBlock**
- Weekly Membership Accounts Growth: **_membership_growthQty**
- Weekly Membership Accounts Growth, %: **_membership_growthPct %**

![_graph_membershipChart](_graph_membershipChart)

# Proposals

### Passed
proposals_executed
### Deciding
proposals_deciding
`;

export const weeklyReportTempleteWithoutMediaStatus = `
**_general_startBlock_timestamp - _general_endBlock_timestamp**
- Start Block: _general_startBlock_number 
- End Block: _general_endBlock_number

# Tokenomics

- Total supply: **_supply_totalSupply JOY**
- JOY inflation (since mainnet launch): **_supply_inflationChanged %**
- Circulating supply:  **_supply_circulatingSupply JOY**
- Weekly Tokens Minted: **_supply_mintedToken JOY**
- Weekly Tokens Burned: **(_supply_burnedToken) JOY**

MEXC exchange wallet:

- Balance:  **_mexc_endBlock JOY**
- Weekly Balance change: **_mexc_changedBalance JOY**

DAO Spending:

- Start Issuance: **_daoSpending_startIssuance JOY**
- End Issuance: **_daoSpending_endIssuance JOY**
- Total minted (net): **_daoSpending_mintedToken JOY**

*including:*

- Council rewards: **_daoSpending_councilReward JOY**
- WG spent: **_daoSpending_wgSpent JOY**
- Funding proposals: **_daoSpending_fundingProposals JOY**
- Creator payout: **_daoSpending_creatorPayoutRewards JOY**
- Validator rewards: **_daoSpending_validatorRewards JOY**
- Fees and token burn: **(_supply_burnedToken) JOY**

# **Content**

### Videos

- Total Videos, qty: **_videos_endBlock**
- Weekly Videos Growth, qty: **_videos_growthQty**
- Weekly Videos Growth, %: **_videos_growthPct%**

![_graph_videosChart](_graph_videosChart)

### Channels

Provided stats below are for non-empty channels only:

- Total Channels, qty:  **_nonEmptyChannel_endBlock**
- Weekly Channels Growth, qty: **_nonEmptyChannel_growthQty**
- Weekly Channels Growth, **_nonEmptyChannel_growthPct%**

![_graph_nonEmptyChannelChart](_graph_nonEmptyChannelChart)

### Video NFTs

- Total NFT: **_videoNFTs_endBlock**
- Weekly NFT Growth: **_videoNFTs_growthQty**
- Weekly NFT Growth, %: **_videoNFTs_growthPct %**
- Weekly NFT sold: _videoNFTs_soldQty

![_graph_videoNftChart](_graph_videoNftChart)

### Creator tokens

- Total market cap: **_crt_totalMCap JOY**
- Weekly cumulative trading volume: **_crt_cumulativeGrowth  JOY**
- Newly minted : **_crt_newlyMinted JOY**
- Total revenue shares amount: **_crt_totalRevenueShares JOY**

![_graph_videoNftChart](_graph_CrtChart)

# **Membership**

- Total Membership Accounts: **_membership_endBlock**
- Weekly Membership Accounts Growth: **_membership_growthQty**
- Weekly Membership Accounts Growth, %: **_membership_growthPct %**

![_graph_membershipChart](_graph_membershipChart)

# Proposals

### Passed
proposals_executed
### Deciding
proposals_deciding
`;

export const councilReportWithMediaStatus = `
# Council Report

- Dates: _general_startBlock_timeStamp → _general_endBlock_timeStamp
- Council Term: _councilInfo_cycleID
- Start block: _general_startBlock_block  _general_startBlock_hash
- End block: _general_endBlock_block _general_endBlock_hash

## 1. Composition

_composition

Election results: https://pioneerapp.xyz/#/election/past-elections/_councilInfo_id

## 2. General stats

- Channels:  **_nonEmptyChannel_growthQty** (total **_nonEmptyChannel_endBlock**)
- Videos: **_videos_growthQty** (total **_videos_endBlock**)
- Storage Used: **_mediaStorage_growthQty** GB (total **_mediaStorage_endBlock** GB)
- Forum threads: **_forum_thread_growthQty** (total **_forum_thread_endBlock**)
- Forum posts: **_forum_post_growthQty** (total **_forum_post_endBlock**)
- Proposals: **_proposal_growthQty** (total **_proposal_endBlock**)
- Memberships: **_membership_growthQty** (total **_membership_endBlock**)
- EMA30: **_EMA30_curEMA USDT**

## 6. Budget

**Overview**

- Starting Council budget: **_overView_startBlock JOY**
- Spending from Council budget: **_overView_spendingBudget JOY**
- Refill of Council budget: **_overView_refillBudget JOY**
- Ending Council budget: **_overView_endBlock JOY**

**Inflation**

Term inflation

- Start issuance: **_inflation_startBlock JOY**
- End issuance: **_inflation_endBlock JOY**
- Term issuance: **_inflation_changedIssuance JOY**
- Term issuance: **_inflation_Inflation %**

Year inflation

- Projected inflation:  **_inflation_yearMintedToken MJOY**
- Projected inflation:  **_inflation_yearInflation %**

**Table 6.1. Inflation**

| Term | Minted, MJOY | Inflation |
| --- | --- | --- |
_project_inflation

**Table 6.2. Overall Budget** 

| Item | Total spending (planned), JOY | Total spending (actual), JOY | Total spending (planned), USDT | Total spending (actual), USDT |
| --- | --- | --- | --- | --- |
| Council rewards |  | _overallBudget_councilReward_currentSpendingOfJoy |  | _overallBudget_councilReward_currentSpendingOfUsd |
| WG spending |  | _overallBudget_wgSpending_currentSpendingOfJoy |  | _overallBudget_wgSpending_currentSpendingOfUsd |
| Funding proposals |  | _overallBudget_fundingProposal_currentSpendingOfJoy |  | _overallBudget_fundingProposal_currentSpendingOfUsd |
| Creator payout rewards |  | _overallBudget_creatorPayoutReward_currentSpendingOfJoy |  | _overallBudget_creatorPayoutReward_currentSpendingOfUsd |
| Validator rewards |  | _overallBudget_validatorReward_currentSpendingOfJoy |  | _overallBudget_validatorReward_currentSpendingOfUsd |
| Fees and commissions |  | (_overallBudget_fees_currentSpendingOfJoy) | 0 | (_overallBudget_fees_currentSpendingOfUsd) |
| Grand Total |  | _overallBudget_grandTotal_currentSpendingOfJoy |  | _overallBudget_grandTotal_currentSpendingOfUsd |

**Table 6.3. WGs’ Workers**

| Working group | Workers number (incl Lead) | Workers hired | Workers fired | Workers left |
| --- | --- | --- | --- | --- |
| Builders | _wgWorkerStatus_Builders_headCound | _wgWorkerStatus_Builders_hired | _wgWorkerStatus_Builders_fired | _wgWorkerStatus_Builders_left |
| Storage | _wgWorkerStatus_Storage_headCound | _wgWorkerStatus_Storage_hired | _wgWorkerStatus_Storage_fired | _wgWorkerStatus_Storage_left |
| Distribution | _wgWorkerStatus_Distribution_headCound | _wgWorkerStatus_Distribution_hired | _wgWorkerStatus_Distribution_fired | _wgWorkerStatus_Distribution_left |
| Forum | _wgWorkerStatus_Forum_headCound | _wgWorkerStatus_Forum_hired | _wgWorkerStatus_Forum_fired | _wgWorkerStatus_Forum_left |
| Apps | _wgWorkerStatus_Apps_headCound | _wgWorkerStatus_Apps_hired | _wgWorkerStatus_Apps_fired | _wgWorkerStatus_Apps_left |
| Content | _wgWorkerStatus_Content_headCound | _wgWorkerStatus_Content_hired | _wgWorkerStatus_Content_fired | _wgWorkerStatus_Content_left |
| HR | _wgWorkerStatus_HR_headCound | _wgWorkerStatus_HR_hired | _wgWorkerStatus_HR_fired | _wgWorkerStatus_HR_left |
| Membership | _wgWorkerStatus_Membership_headCound | _wgWorkerStatus_Membership_hired | _wgWorkerStatus_Membership_fired | _wgWorkerStatus_Membership_left |
| Marketing | _wgWorkerStatus_Marketing_headCound | _wgWorkerStatus_Marketing_hired | _wgWorkerStatus_Marketing_fired | _wgWorkerStatus_Marketing_left |
| Total | _wgWorkerTotal_headCound | _wgWorkerTotal_hired | _wgWorkerTotal_fired | _wgWorkerTotal_left |

**Table 6.4. WGs’ Budgets, JOY**

| Working group | Start budget, JOY | Refilled, JOY | Spending (planned), JOY | Spending (actual), JOY | Workers rewards, JOY | Lead rewards, JOY | End budget, JOY |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Builders | _wgBudgetsOfJoy_Builders_startWGBudget | _wgBudgetsOfJoy_Builders_refillBudget |  | _wgBudgetsOfJoy_Builders_totalSpending | _wgBudgetsOfJoy_Builders_regularSalaries | _wgBudgetsOfJoy_Builders_leadRewards | _wgBudgetsOfJoy_Builders_endWGBudget |
| Storage | _wgBudgetsOfJoy_Storage_startWGBudget | _wgBudgetsOfJoy_Storage_refillBudget |  | _wgBudgetsOfJoy_Storage_totalSpending | _wgBudgetsOfJoy_Storage_regularSalaries | _wgBudgetsOfJoy_Storage_leadRewards | _wgBudgetsOfJoy_Storage_endWGBudget |
| Distribution | _wgBudgetsOfJoy_Distribution_startWGBudget | _wgBudgetsOfJoy_Distribution_refillBudget |  | _wgBudgetsOfJoy_Distribution_totalSpending | _wgBudgetsOfJoy_Distribution_regularSalaries | _wgBudgetsOfJoy_Distribution_leadRewards | _wgBudgetsOfJoy_Distribution_endWGBudget |
| Forum | _wgBudgetsOfJoy_Forum_startWGBudget | _wgBudgetsOfJoy_Forum_refillBudget |  | _wgBudgetsOfJoy_Forum_totalSpending | _wgBudgetsOfJoy_Forum_regularSalaries | _wgBudgetsOfJoy_Forum_leadRewards | _wgBudgetsOfJoy_Forum_endWGBudget |
| Apps | _wgBudgetsOfJoy_Apps_startWGBudget | _wgBudgetsOfJoy_Apps_refillBudget |  | _wgBudgetsOfJoy_Apps_totalSpending | _wgBudgetsOfJoy_Apps_regularSalaries | _wgBudgetsOfJoy_Apps_leadRewards | _wgBudgetsOfJoy_Apps_endWGBudget |
| Content | _wgBudgetsOfJoy_Content_startWGBudget | _wgBudgetsOfJoy_Content_refillBudget |  | _wgBudgetsOfJoy_Content_totalSpending | _wgBudgetsOfJoy_Content_regularSalaries | _wgBudgetsOfJoy_Content_leadRewards | _wgBudgetsOfJoy_Content_endWGBudget |
| HR | _wgBudgetsOfJoy_HR_startWGBudget | _wgBudgetsOfJoy_HR_refillBudget |  | _wgBudgetsOfJoy_HR_totalSpending | _wgBudgetsOfJoy_HR_regularSalaries | _wgBudgetsOfJoy_HR_leadRewards | _wgBudgetsOfJoy_HR_endWGBudget |
| Membership | _wgBudgetsOfJoy_Membership_startWGBudget | _wgBudgetsOfJoy_Membership_refillBudget |  | _wgBudgetsOfJoy_Membership_totalSpending | _wgBudgetsOfJoy_Membership_regularSalaries | _wgBudgetsOfJoy_Membership_leadRewards | _wgBudgetsOfJoy_Membership_endWGBudget |
| Marketing | _wgBudgetsOfJoy_Marketing_startWGBudget | _wgBudgetsOfJoy_Marketing_refillBudget |  | _wgBudgetsOfJoy_Marketing_totalSpending | _wgBudgetsOfJoy_Marketing_regularSalaries | _wgBudgetsOfJoy_Marketing_leadRewards | _wgBudgetsOfJoy_Marketing_endWGBudget |
| Total | _wgBudgetOfJoyTotal_startWGBudget | _wgBudgetOfJoyTotal_refillBudget |  | _wgBudgetOfJoyTotal_totalSpending | _wgBudgetOfJoyTotal_regularSalaries | _wgBudgetOfJoyTotal_leadRewards | _wgBudgetOfJoyTotal_endWGBudget |

**Table 6.5. WGs’ Budgets, USDT**

| Working group | Start budget, USDT | Refilled, USDT | Spending (planned), USDT | Spending (actual), USDT | Workers rewards, USDT | Lead rewards, USDT | End budget, USDT |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Builders | _wgBudgetsOfUsd_Builders_startWGBudget | _wgBudgetsOfUsd_Builders_refillBudget |  | _wgBudgetsOfUsd_Builders_totalSpending | _wgBudgetsOfUsd_Builders_regularSalaries | _wgBudgetsOfUsd_Builders_leadRewards | _wgBudgetsOfUsd_Builders_endWGBudget |
| Storage | _wgBudgetsOfUsd_Storage_startWGBudget | _wgBudgetsOfUsd_Storage_refillBudget |  | _wgBudgetsOfUsd_Storage_totalSpending | _wgBudgetsOfUsd_Storage_regularSalaries | _wgBudgetsOfUsd_Storage_leadRewards | _wgBudgetsOfUsd_Storage_endWGBudget |
| Distribution | _wgBudgetsOfUsd_Distribution_startWGBudget | _wgBudgetsOfUsd_Distribution_refillBudget |  | _wgBudgetsOfUsd_Distribution_totalSpending | _wgBudgetsOfUsd_Distribution_regularSalaries | _wgBudgetsOfUsd_Distribution_leadRewards | _wgBudgetsOfUsd_Distribution_endWGBudget |
| Forum | _wgBudgetsOfUsd_Forum_startWGBudget | _wgBudgetsOfUsd_Forum_refillBudget |  | _wgBudgetsOfUsd_Forum_totalSpending | _wgBudgetsOfUsd_Forum_regularSalaries | _wgBudgetsOfUsd_Forum_leadRewards | _wgBudgetsOfUsd_Forum_endWGBudget |
| Apps | _wgBudgetsOfUsd_Apps_startWGBudget | _wgBudgetsOfUsd_Apps_refillBudget |  | _wgBudgetsOfUsd_Apps_totalSpending | _wgBudgetsOfUsd_Apps_regularSalaries | _wgBudgetsOfUsd_Apps_leadRewards | _wgBudgetsOfUsd_Apps_endWGBudget |
| Content | _wgBudgetsOfUsd_Content_startWGBudget | _wgBudgetsOfUsd_Content_refillBudget |  | _wgBudgetsOfUsd_Content_totalSpending | _wgBudgetsOfUsd_Content_regularSalaries | _wgBudgetsOfUsd_Content_leadRewards | _wgBudgetsOfUsd_Content_endWGBudget |
| HR | _wgBudgetsOfUsd_HR_startWGBudget | _wgBudgetsOfUsd_HR_refillBudget |  | _wgBudgetsOfUsd_HR_totalSpending | _wgBudgetsOfUsd_HR_regularSalaries | _wgBudgetsOfUsd_HR_leadRewards | _wgBudgetsOfUsd_HR_endWGBudget |
| Membership | _wgBudgetsOfUsd_Membership_startWGBudget | _wgBudgetsOfUsd_Membership_refillBudget |  | _wgBudgetsOfUsd_Membership_totalSpending | _wgBudgetsOfUsd_Membership_regularSalaries | _wgBudgetsOfUsd_Membership_leadRewards | _wgBudgetsOfUsd_Membership_endWGBudget |
| Marketing | _wgBudgetsOfUsd_Marketing_startWGBudget | _wgBudgetsOfUsd_Marketing_refillBudget |  | _wgBudgetsOfUsd_Marketing_totalSpending | _wgBudgetsOfUsd_Marketing_regularSalaries | _wgBudgetsOfUsd_Marketing_leadRewards | _wgBudgetsOfUsd_Marketing_endWGBudget |
| Total | _wgBudgetOfUsdTotal_startWGBudget | _wgBudgetOfUsdTotal_refillBudget |  | _wgBudgetOfUsdTotal_totalSpending | _wgBudgetOfUsdTotal_regularSalaries | _wgBudgetOfUsdTotal_leadRewards | _wgBudgetOfUsdTotal_endWGBudget |

### **Proposals**

[https://pioneerapp.xyz/#/council/past-councils/_councilInfo_id](https://pioneerapp.xyz/#/council/past-councils/_councilInfo_id)

## **7. Financial Dashboard**

### O**verall Spending**

ema30 (current term)= _EMA30_curEMA

ema30 (prev term)= _EMA30_prevEMA

| Item | Spending (previous term), JOY | Spending (current term), JOY | Spending (previous term), USDT | Spending (current term), USDT |
| --- | --- | --- | --- | --- |
| Council rewards | _overallBudget_councilReward_prevSpendingOfJoy | _overallBudget_councilReward_currentSpendingOfJoy | _overallBudget_councilReward_prevSpendingOfUsd | _overallBudget_councilReward_currentSpendingOfUsd |
| WG filled | _overallBudget_wgSpending_prevSpendingOfJoy | _overallBudget_wgSpending_currentSpendingOfJoy | _overallBudget_wgSpending_prevSpendingOfUsd | _overallBudget_wgSpending_currentSpendingOfUsd |
| Funding proposals | _overallBudget_fundingProposal_prevSpendingOfJoy | _overallBudget_fundingProposal_currentSpendingOfJoy | _overallBudget_fundingProposal_prevSpendingOfUsd | _overallBudget_fundingProposal_currentSpendingOfUsd |
| Creator payout rewards | _overallBudget_creatorPayoutReward_prevSpendingOfJoy | _overallBudget_creatorPayoutReward_currentSpendingOfJoy | _overallBudget_creatorPayoutReward_prevSpendingOfUsd | _overallBudget_creatorPayoutReward_currentSpendingOfUsd |
| Validator rewards | _overallBudget_validatorReward_prevSpendingOfJoy | _overallBudget_validatorReward_currentSpendingOfJoy | _overallBudget_validatorReward_prevSpendingOfUsd | _overallBudget_validatorReward_currentSpendingOfUsd |
| Fees and commissions |  | _overallBudget_fees_currentSpendingOfJoy | 0 | _overallBudget_fees_currentSpendingOfUsd |
| Grand Total | _overallBudget_grandTotal_prevSpendingOfJoy | _overallBudget_grandTotal_currentSpendingOfJoy | _overallBudget_grandTotal_prevSpendingOfUsd | _overallBudget_grandTotal_currentSpendingOfUsd |

**Chart 7.1. Overall spending for current term, JOY**

**Chart 7.2. Overall spending for current term, USDT**

![_graph_overallPieChart](_graph_overallPieChart)

**Chart 7.3. Overall spending (current term VS prev term), JOY**

![_graph_overallBudget-joy](_graph_overallBudget-joy)

**Chart 7.4. Overall spending (current term VS prev term), USDT**

![_graph_overallBudget-usdt](_graph_overallBudget-usdt)

### **WGs’ Spending**

EMA30 (current term)= _EMA30_curEMA

EMA30 (prev term)= _EMA30_prevEMA

| Working group | Spending (previous term), JOY | Spending (current term), JOY | Spending (previous term), USDT | Spending (current term), USDT |
| --- | --- | --- | --- | --- |
| Builders | _wgSpending_Builders_prevSpendingOfJoy | _wgSpending_Builders_currentSpendingOfJoy | _wgSpending_Builders_prevSpendingOfUsd | _wgSpending_Builders_currentSpendingOfUsd |
| Storage | _wgSpending_Storage_prevSpendingOfJoy | _wgSpending_Storage_currentSpendingOfJoy | _wgSpending_Storage_prevSpendingOfUsd | _wgSpending_Storage_currentSpendingOfUsd |
| Distribution | _wgSpending_Distribution_prevSpendingOfJoy | _wgSpending_Distribution_currentSpendingOfJoy | _wgSpending_Distribution_prevSpendingOfUsd | _wgSpending_Distribution_currentSpendingOfUsd |
| Forum | _wgSpending_Forum_prevSpendingOfJoy | _wgSpending_Forum_currentSpendingOfJoy | _wgSpending_Forum_prevSpendingOfUsd | _wgSpending_Forum_currentSpendingOfUsd |
| Apps | _wgSpending_Apps_prevSpendingOfJoy | _wgSpending_Apps_currentSpendingOfJoy | _wgSpending_Apps_prevSpendingOfUsd | _wgSpending_Apps_currentSpendingOfUsd |
| Content | _wgSpending_Content_prevSpendingOfJoy | _wgSpending_Content_currentSpendingOfJoy | _wgSpending_Content_prevSpendingOfUsd | _wgSpending_Content_currentSpendingOfUsd |
| HR | _wgSpending_HR_prevSpendingOfJoy | _wgSpending_HR_currentSpendingOfJoy | _wgSpending_HR_prevSpendingOfUsd | _wgSpending_HR_currentSpendingOfUsd |
| Membership | _wgSpending_Membership_prevSpendingOfJoy | _wgSpending_Membership_currentSpendingOfJoy | _wgSpending_Membership_prevSpendingOfUsd | _wgSpending_Membership_currentSpendingOfUsd |
| Marketing | _wgSpending_Marketing_prevSpendingOfJoy | _wgSpending_Marketing_currentSpendingOfJoy | _wgSpending_Marketing_prevSpendingOfUsd | _wgSpending_Marketing_currentSpendingOfUsd |
| Total | _wgSpendingTotal_prevSpendingOfJoy | _wgSpendingTotal_currentSpendingOfJoy| _wgSpendingTotal_prevSpendingOfUsd | _wgSpendingTotal_currentSpendingOfUsd |

**Chart 7.5. WGs’ spending for current term, JOY**

**Chart 7.6. WGs’ spending for current term, USDT**

![_graph_wgPieChart](_graph_wgPieChart)

**Chart 7.7. WGs’ spending (current term VS prev term), JOY**

![_graph_wgBudget-joy](_graph_wgBudget-joy)

**Chart 7.8. WGs’ spending (current term VS prev term), USDT**

![_graph_wgBudget-usdt](_graph_wgBudget-usdt)
`;

export const councilReportWithOutMediaStatus = `
# Council Report

- Dates: _general_startBlock_timeStamp → _general_endBlock_timeStamp
- Council Term: _councilInfo_id
- Start block: _general_startBlock_block  _general_startBlock_hash
- End block: _general_endBlock_block _general_endBlock_hash

## 1. Composition

_composition

Election results: https://pioneerapp.xyz/#/election/past-elections/_councilInfo_id

## 2. General stats

- Channels:  **_nonEmptyChannel_growthQty** (total **_nonEmptyChannel_endBlock**)
- Videos: **_videos_growthQty** (total **_videos_endBlock**)
- Forum threads: **_forum_thread_growthQty** (total **_forum_thread_endBlock**)
- Forum posts: **_forum_post_growthQty** (total **_forum_post_endBlock**)
- Proposals: **_proposal_growthQty** (total **_proposal_endBlock**)
- Memberships: **_membership_growthQty** (total **_membership_endBlock**)
- EMA30: **_EMA30_curEMA USDT**

## 6. Budget

**Overview**

- Starting Council budget: **_overView_startBlock JOY**
- Spending from Council budget: **_overView_spendingBudget JOY**
- Refill of Council budget: **_overView_refillBudget JOY**
- Ending Council budget: **_overView_endBlock JOY**

**Inflation**

Term inflation

- Start issuance: **_inflation_startBlock JOY**
- End issuance: **_inflation_endBlock JOY**
- Term issuance: **_inflation_changedIssuance JOY**
- Term issuance: **_inflation_Inflation %**

Year inflation

- Projected inflation:  **_inflation_yearMintedToken MJOY**
- Projected inflation:  **_inflation_yearInflation %**

**Table 6.1. Inflation**

| Term | Minted, MJOY | Inflation |
| --- | --- | --- |
_project_inflation

**Table 6.2. Overall Budget** 

| Item | Total spending (planned), JOY | Total spending (actual), JOY | Total spending (planned), USDT | Total spending (actual), USDT |
| --- | --- | --- | --- | --- |
| Council rewards |  | _overallBudget_councilReward_currentSpendingOfJoy |  | _overallBudget_councilReward_currentSpendingOfUsd |
| WG spending |  | _overallBudget_wgSpending_currentSpendingOfJoy |  | _overallBudget_wgSpending_currentSpendingOfUsd |
| Funding proposals |  | _overallBudget_fundingProposal_currentSpendingOfJoy |  | _overallBudget_fundingProposal_currentSpendingOfUsd |
| Creator payout rewards |  | _overallBudget_creatorPayoutReward_currentSpendingOfJoy |  | _overallBudget_creatorPayoutReward_currentSpendingOfUsd |
| Validator rewards |  | _overallBudget_validatorReward_currentSpendingOfJoy |  | _overallBudget_validatorReward_currentSpendingOfUsd |
| Fees and commissions |  | (_overallBudget_fees_currentSpendingOfJoy) | 0 | (_overallBudget_fees_currentSpendingOfUsd) |
| Grand Total |  | _overallBudget_grandTotal_currentSpendingOfJoy |  | _overallBudget_grandTotal_currentSpendingOfUsd |

**Table 6.3. WGs’ Workers**

| Working group | Workers number (incl Lead) | Workers hired | Workers fired | Workers left |
| --- | --- | --- | --- | --- |
| Builders | _wgWorkerStatus_Builders_headCound | _wgWorkerStatus_Builders_hired | _wgWorkerStatus_Builders_fired | _wgWorkerStatus_Builders_left |
| Storage | _wgWorkerStatus_Storage_headCound | _wgWorkerStatus_Storage_hired | _wgWorkerStatus_Storage_fired | _wgWorkerStatus_Storage_left |
| Distribution | _wgWorkerStatus_Distribution_headCound | _wgWorkerStatus_Distribution_hired | _wgWorkerStatus_Distribution_fired | _wgWorkerStatus_Distribution_left |
| Forum | _wgWorkerStatus_Forum_headCound | _wgWorkerStatus_Forum_hired | _wgWorkerStatus_Forum_fired | _wgWorkerStatus_Forum_left |
| Apps | _wgWorkerStatus_Apps_headCound | _wgWorkerStatus_Apps_hired | _wgWorkerStatus_Apps_fired | _wgWorkerStatus_Apps_left |
| Content | _wgWorkerStatus_Content_headCound | _wgWorkerStatus_Content_hired | _wgWorkerStatus_Content_fired | _wgWorkerStatus_Content_left |
| HR | _wgWorkerStatus_HR_headCound | _wgWorkerStatus_HR_hired | _wgWorkerStatus_HR_fired | _wgWorkerStatus_HR_left |
| Membership | _wgWorkerStatus_Membership_headCound | _wgWorkerStatus_Membership_hired | _wgWorkerStatus_Membership_fired | _wgWorkerStatus_Membership_left |
| Marketing | _wgWorkerStatus_Marketing_headCound | _wgWorkerStatus_Marketing_hired | _wgWorkerStatus_Marketing_fired | _wgWorkerStatus_Marketing_left |
| Total | _wgWorkerTotal_headCound | _wgWorkerTotal_hired | _wgWorkerTotal_fired | _wgWorkerTotal_left |

**Table 6.4. WGs’ Budgets, JOY**

| Working group | Start budget, JOY | Refilled, JOY | Spending (planned), JOY | Spending (actual), JOY | Workers rewards, JOY | Lead rewards, JOY | End budget, JOY |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Builders | _wgBudgetsOfJoy_Builders_startWGBudget | _wgBudgetsOfJoy_Builders_refillBudget |  | _wgBudgetsOfJoy_Builders_totalSpending | _wgBudgetsOfJoy_Builders_regularSalaries | _wgBudgetsOfJoy_Builders_leadRewards | _wgBudgetsOfJoy_Builders_endWGBudget |
| Storage | _wgBudgetsOfJoy_Storage_startWGBudget | _wgBudgetsOfJoy_Storage_refillBudget |  | _wgBudgetsOfJoy_Storage_totalSpending | _wgBudgetsOfJoy_Storage_regularSalaries | _wgBudgetsOfJoy_Storage_leadRewards | _wgBudgetsOfJoy_Storage_endWGBudget |
| Distribution | _wgBudgetsOfJoy_Distribution_startWGBudget | _wgBudgetsOfJoy_Distribution_refillBudget |  | _wgBudgetsOfJoy_Distribution_totalSpending | _wgBudgetsOfJoy_Distribution_regularSalaries | _wgBudgetsOfJoy_Distribution_leadRewards | _wgBudgetsOfJoy_Distribution_endWGBudget |
| Forum | _wgBudgetsOfJoy_Forum_startWGBudget | _wgBudgetsOfJoy_Forum_refillBudget |  | _wgBudgetsOfJoy_Forum_totalSpending | _wgBudgetsOfJoy_Forum_regularSalaries | _wgBudgetsOfJoy_Forum_leadRewards | _wgBudgetsOfJoy_Forum_endWGBudget |
| Apps | _wgBudgetsOfJoy_Apps_startWGBudget | _wgBudgetsOfJoy_Apps_refillBudget |  | _wgBudgetsOfJoy_Apps_totalSpending | _wgBudgetsOfJoy_Apps_regularSalaries | _wgBudgetsOfJoy_Apps_leadRewards | _wgBudgetsOfJoy_Apps_endWGBudget |
| Content | _wgBudgetsOfJoy_Content_startWGBudget | _wgBudgetsOfJoy_Content_refillBudget |  | _wgBudgetsOfJoy_Content_totalSpending | _wgBudgetsOfJoy_Content_regularSalaries | _wgBudgetsOfJoy_Content_leadRewards | _wgBudgetsOfJoy_Content_endWGBudget |
| HR | _wgBudgetsOfJoy_HR_startWGBudget | _wgBudgetsOfJoy_HR_refillBudget |  | _wgBudgetsOfJoy_HR_totalSpending | _wgBudgetsOfJoy_HR_regularSalaries | _wgBudgetsOfJoy_HR_leadRewards | _wgBudgetsOfJoy_HR_endWGBudget |
| Membership | _wgBudgetsOfJoy_Membership_startWGBudget | _wgBudgetsOfJoy_Membership_refillBudget |  | _wgBudgetsOfJoy_Membership_totalSpending | _wgBudgetsOfJoy_Membership_regularSalaries | _wgBudgetsOfJoy_Membership_leadRewards | _wgBudgetsOfJoy_Membership_endWGBudget |
| Marketing | _wgBudgetsOfJoy_Marketing_startWGBudget | _wgBudgetsOfJoy_Marketing_refillBudget |  | _wgBudgetsOfJoy_Marketing_totalSpending | _wgBudgetsOfJoy_Marketing_regularSalaries | _wgBudgetsOfJoy_Marketing_leadRewards | _wgBudgetsOfJoy_Marketing_endWGBudget |
| Total | _wgBudgetOfJoyTotal_startWGBudget | _wgBudgetOfJoyTotal_refillBudget |  | _wgBudgetOfJoyTotal_totalSpending | _wgBudgetOfJoyTotal_regularSalaries | _wgBudgetOfJoyTotal_leadRewards | _wgBudgetOfJoyTotal_endWGBudget |

**Table 6.5. WGs’ Budgets, USDT**

| Working group | Start budget, USDT | Refilled, USDT | Spending (planned), USDT | Spending (actual), USDT | Workers rewards, USDT | Lead rewards, USDT | End budget, USDT |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Builders | _wgBudgetsOfUsd_Builders_startWGBudget | _wgBudgetsOfUsd_Builders_refillBudget |  | _wgBudgetsOfUsd_Builders_totalSpending | _wgBudgetsOfUsd_Builders_regularSalaries | _wgBudgetsOfUsd_Builders_leadRewards | _wgBudgetsOfUsd_Builders_endWGBudget |
| Storage | _wgBudgetsOfUsd_Storage_startWGBudget | _wgBudgetsOfUsd_Storage_refillBudget |  | _wgBudgetsOfUsd_Storage_totalSpending | _wgBudgetsOfUsd_Storage_regularSalaries | _wgBudgetsOfUsd_Storage_leadRewards | _wgBudgetsOfUsd_Storage_endWGBudget |
| Distribution | _wgBudgetsOfUsd_Distribution_startWGBudget | _wgBudgetsOfUsd_Distribution_refillBudget |  | _wgBudgetsOfUsd_Distribution_totalSpending | _wgBudgetsOfUsd_Distribution_regularSalaries | _wgBudgetsOfUsd_Distribution_leadRewards | _wgBudgetsOfUsd_Distribution_endWGBudget |
| Forum | _wgBudgetsOfUsd_Forum_startWGBudget | _wgBudgetsOfUsd_Forum_refillBudget |  | _wgBudgetsOfUsd_Forum_totalSpending | _wgBudgetsOfUsd_Forum_regularSalaries | _wgBudgetsOfUsd_Forum_leadRewards | _wgBudgetsOfUsd_Forum_endWGBudget |
| Apps | _wgBudgetsOfUsd_Apps_startWGBudget | _wgBudgetsOfUsd_Apps_refillBudget |  | _wgBudgetsOfUsd_Apps_totalSpending | _wgBudgetsOfUsd_Apps_regularSalaries | _wgBudgetsOfUsd_Apps_leadRewards | _wgBudgetsOfUsd_Apps_endWGBudget |
| Content | _wgBudgetsOfUsd_Content_startWGBudget | _wgBudgetsOfUsd_Content_refillBudget |  | _wgBudgetsOfUsd_Content_totalSpending | _wgBudgetsOfUsd_Content_regularSalaries | _wgBudgetsOfUsd_Content_leadRewards | _wgBudgetsOfUsd_Content_endWGBudget |
| HR | _wgBudgetsOfUsd_HR_startWGBudget | _wgBudgetsOfUsd_HR_refillBudget |  | _wgBudgetsOfUsd_HR_totalSpending | _wgBudgetsOfUsd_HR_regularSalaries | _wgBudgetsOfUsd_HR_leadRewards | _wgBudgetsOfUsd_HR_endWGBudget |
| Membership | _wgBudgetsOfUsd_Membership_startWGBudget | _wgBudgetsOfUsd_Membership_refillBudget |  | _wgBudgetsOfUsd_Membership_totalSpending | _wgBudgetsOfUsd_Membership_regularSalaries | _wgBudgetsOfUsd_Membership_leadRewards | _wgBudgetsOfUsd_Membership_endWGBudget |
| Marketing | _wgBudgetsOfUsd_Marketing_startWGBudget | _wgBudgetsOfUsd_Marketing_refillBudget |  | _wgBudgetsOfUsd_Marketing_totalSpending | _wgBudgetsOfUsd_Marketing_regularSalaries | _wgBudgetsOfUsd_Marketing_leadRewards | _wgBudgetsOfUsd_Marketing_endWGBudget |
| Total | _wgBudgetOfUsdTotal_startWGBudget | _wgBudgetOfUsdTotal_refillBudget |  | _wgBudgetOfUsdTotal_totalSpending | _wgBudgetOfUsdTotal_regularSalaries | _wgBudgetOfUsdTotal_leadRewards | _wgBudgetOfUsdTotal_endWGBudget |

### **Proposals**

[https://pioneerapp.xyz/#/council/past-councils/_councilInfo_id](https://pioneerapp.xyz/#/council/past-councils/_councilInfo_id)

## **7. Financial Dashboard**

### O**verall Spending**

ema30 (current term)= _EMA30_curEMA

ema30 (prev term)= _EMA30_prevEMA

| Item | Spending (previous term), JOY | Spending (current term), JOY | Spending (previous term), USDT | Spending (current term), USDT |
| --- | --- | --- | --- | --- |
| Council rewards | _overallBudget_councilReward_prevSpendingOfJoy | _overallBudget_councilReward_currentSpendingOfJoy | _overallBudget_councilReward_prevSpendingOfUsd | _overallBudget_councilReward_currentSpendingOfUsd |
| WG filled | _overallBudget_wgSpending_prevSpendingOfJoy | _overallBudget_wgSpending_currentSpendingOfJoy | _overallBudget_wgSpending_prevSpendingOfUsd | _overallBudget_wgSpending_currentSpendingOfUsd |
| Funding proposals | _overallBudget_fundingProposal_prevSpendingOfJoy | _overallBudget_fundingProposal_currentSpendingOfJoy | _overallBudget_fundingProposal_prevSpendingOfUsd | _overallBudget_fundingProposal_currentSpendingOfUsd |
| Creator payout rewards | _overallBudget_creatorPayoutReward_prevSpendingOfJoy | _overallBudget_creatorPayoutReward_currentSpendingOfJoy | _overallBudget_creatorPayoutReward_prevSpendingOfUsd | _overallBudget_creatorPayoutReward_currentSpendingOfUsd |
| Validator rewards | _overallBudget_validatorReward_prevSpendingOfJoy | _overallBudget_validatorReward_currentSpendingOfJoy | _overallBudget_validatorReward_prevSpendingOfUsd | _overallBudget_validatorReward_currentSpendingOfUsd |
| Fees and commissions |  | _overallBudget_fees_currentSpendingOfJoy | 0 | _overallBudget_fees_currentSpendingOfUsd |
| Grand Total | _overallBudget_grandTotal_prevSpendingOfJoy | _overallBudget_grandTotal_currentSpendingOfJoy | _overallBudget_grandTotal_prevSpendingOfUsd | _overallBudget_grandTotal_currentSpendingOfUsd |

**Chart 7.1. Overall spending for current term, JOY**

**Chart 7.2. Overall spending for current term, USDT**

![_graph_overallPieChart](_graph_overallPieChart)

**Chart 7.3. Overall spending (current term VS prev term), JOY**

![_graph_overallBudget-joy](_graph_overallBudget-joy)

**Chart 7.4. Overall spending (current term VS prev term), USDT**

![_graph_overallBudget-usdt](_graph_overallBudget-usdt)

### **WGs’ Spending**

EMA30 (current term)= _EMA30_curEMA

EMA30 (prev term)= _EMA30_prevEMA

| Working group | Spending (previous term), JOY | Spending (current term), JOY | Spending (previous term), USDT | Spending (current term), USDT |
| --- | --- | --- | --- | --- |
| Builders | _wgSpending_Builders_prevSpendingOfJoy | _wgSpending_Builders_currentSpendingOfJoy | _wgSpending_Builders_prevSpendingOfUsd | _wgSpending_Builders_currentSpendingOfUsd |
| Storage | _wgSpending_Storage_prevSpendingOfJoy | _wgSpending_Storage_currentSpendingOfJoy | _wgSpending_Storage_prevSpendingOfUsd | _wgSpending_Storage_currentSpendingOfUsd |
| Distribution | _wgSpending_Distribution_prevSpendingOfJoy | _wgSpending_Distribution_currentSpendingOfJoy | _wgSpending_Distribution_prevSpendingOfUsd | _wgSpending_Distribution_currentSpendingOfUsd |
| Forum | _wgSpending_Forum_prevSpendingOfJoy | _wgSpending_Forum_currentSpendingOfJoy | _wgSpending_Forum_prevSpendingOfUsd | _wgSpending_Forum_currentSpendingOfUsd |
| Apps | _wgSpending_Apps_prevSpendingOfJoy | _wgSpending_Apps_currentSpendingOfJoy | _wgSpending_Apps_prevSpendingOfUsd | _wgSpending_Apps_currentSpendingOfUsd |
| Content | _wgSpending_Content_prevSpendingOfJoy | _wgSpending_Content_currentSpendingOfJoy | _wgSpending_Content_prevSpendingOfUsd | _wgSpending_Content_currentSpendingOfUsd |
| HR | _wgSpending_HR_prevSpendingOfJoy | _wgSpending_HR_currentSpendingOfJoy | _wgSpending_HR_prevSpendingOfUsd | _wgSpending_HR_currentSpendingOfUsd |
| Membership | _wgSpending_Membership_prevSpendingOfJoy | _wgSpending_Membership_currentSpendingOfJoy | _wgSpending_Membership_prevSpendingOfUsd | _wgSpending_Membership_currentSpendingOfUsd |
| Marketing | _wgSpending_Marketing_prevSpendingOfJoy | _wgSpending_Marketing_currentSpendingOfJoy | _wgSpending_Marketing_prevSpendingOfUsd | _wgSpending_Marketing_currentSpendingOfUsd |
| Total | _wgSpendingTotal_prevSpendingOfJoy | _wgSpendingTotal_currentSpendingOfJoy| _wgSpendingTotal_prevSpendingOfUsd | _wgSpendingTotal_currentSpendingOfUsd |

**Chart 7.5. WGs’ spending for current term, JOY**

**Chart 7.6. WGs’ spending for current term, USDT**

![_graph_wgPieChart](_graph_wgPieChart)

**Chart 7.7. WGs’ spending (current term VS prev term), JOY**

![_graph_wgBudget-joy](_graph_wgBudget-joy)

**Chart 7.8. WGs’ spending (current term VS prev term), USDT**

![_graph_wgBudget-usdt](_graph_wgBudget-usdt)
`;
