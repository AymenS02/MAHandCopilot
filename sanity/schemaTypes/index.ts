import { type SchemaTypeDefinition } from "sanity";
import { eventType } from "./eventType";
import { jobType } from "./jobType";
import { announcementType } from "./announcementType";
import { heroLinkType } from "./heroLinkType";
import { schedulePageType } from "./schedulePageType";
import { campaignPageType } from "./campaignPageType";
import { teamMemberType } from "./teamMemberType";
import { homepageHeroType } from "./homepageHeroType";
import { durationType } from "./duration/durationType";
import { timeValueType } from "./duration/timeValueType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [eventType, jobType, announcementType, heroLinkType, schedulePageType, campaignPageType, teamMemberType, homepageHeroType, durationType, timeValueType],
};
