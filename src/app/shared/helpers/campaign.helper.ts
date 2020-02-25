import * as campaignModels from 'app/shared/models/campaign.model';
import * as _ from 'underscore';

export function updateCampaignsWithStatistics(
  campaings: Array<campaignModels.Campaign>,
  statistics: Array<campaignModels.CampaignStatistics>
) {
  return _.map(campaings, (item: campaignModels.Campaign) => {
    const statisticsItem = _.find(
      statistics,
      (s_item: campaignModels.CampaignStatistics) =>
        s_item.campaign_id === item.campaign_id
    );
    const campaign: campaignModels.Campaign = _.extend(item, statisticsItem);
    return campaign;
  });
}

export function getButtonStatus(processingStatus: number) {
  const buttonStatus: campaignModels.CampaignAction = {
    show_edit: true,
    show_detail: true,
    show_start: true,
    show_stop: true,
    show_testing: true,
    show_check: false,
    show_stop_check: false,
  };

  switch (processingStatus) {
    case 0:
      buttonStatus.show_edit = false;
      buttonStatus.show_start = false;
      buttonStatus.show_stop = false;
      buttonStatus.show_testing = false;
      break;
    case 1:
      buttonStatus.show_edit = false;
      buttonStatus.show_start = false;
      buttonStatus.show_stop = false;
      buttonStatus.show_testing = false;
      break;
    case 2:
      buttonStatus.show_check = true;
      break;
    case 3:
      buttonStatus.show_start = false;
      buttonStatus.show_stop = false;
      buttonStatus.show_testing = false;
      buttonStatus.show_edit = false;
      break;
    case 4:
      buttonStatus.show_start = false;
      buttonStatus.show_testing = false;
      break;
    case 5:
      buttonStatus.show_start = false;
      buttonStatus.show_stop = false;
      buttonStatus.show_testing = false;
      break;
    case 6:
      buttonStatus.show_start = false;
      buttonStatus.show_stop = false;
      buttonStatus.show_testing = false;
      break;
    case 7:
      buttonStatus.show_start = false;
      break;
    case 8:
      buttonStatus.show_start = false;
      buttonStatus.show_stop = false;
      buttonStatus.show_edit = false;
      break;
    case 9:
      buttonStatus.show_start = false;
      buttonStatus.show_testing = false;
      buttonStatus.show_edit = false;
      break;
    case 10:
      buttonStatus.show_start = false;
      buttonStatus.show_stop = false;
      buttonStatus.show_testing = false;
      buttonStatus.show_edit = false;
      break;
    case 11:
      break;
    case 12:
      buttonStatus.show_check = true;
      buttonStatus.show_stop = false;
      break;
    case 13:
      buttonStatus.show_stop = false;
      break;
    case 14:
      buttonStatus.show_stop = false;
      buttonStatus.show_edit = false;
      break;
    case 15:
      buttonStatus.show_stop = false;
      buttonStatus.show_check = true;
      break;
    case 16:
      buttonStatus.show_start = false;
      buttonStatus.show_stop = false;
      buttonStatus.show_testing = false;
      buttonStatus.show_edit = false;
      break;
    case 17:
      buttonStatus.show_start = false;
      buttonStatus.show_stop = false;
      buttonStatus.show_testing = false;
      buttonStatus.show_edit = false;
      break;
    case 18:
      buttonStatus.show_stop = false;
      buttonStatus.show_check = true;
      break;
    case 19:
      buttonStatus.show_check = false;
      buttonStatus.show_stop_check = true;
      break;
    default:
      break;
  }
  return buttonStatus;
}
