import Ember from 'ember';
import { truncateString } from 'admin-dataview/utils/utils';
/**
 * @return {Object} normamlize transcript data
 */

export default Ember.Object.extend({
  /**
   * @return {Object} normalizeTranscript
   **/
  normalizeTranscript(payload) {
    let transcripts = payload.transcripts ? payload.transcripts : Ember.A();
    if (transcripts) {
      transcripts = transcripts.map(transcript => {
        transcript.shortTranscript = truncateString(transcript.transcript, 35);
        return Ember.Object.create(transcript);
      });
    }
    return transcripts;
  },

  /**
   * @return {Object} normalizeTranscript
   **/
  normalizeSummary(payload) {
    let summaries = payload.summary ? payload.summary : Ember.A();
    if (summaries) {
      summaries = summaries.map(summary => {
        summary.shortSummary = summary.summaryText[0]
          ? truncateString(summary.summaryText[0], 35)
          : '';
        return Ember.Object.create(summary);
      });
    }
    return summaries;
  }
});
