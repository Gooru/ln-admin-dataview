import Ember from 'ember';

/**
 * Serializer for Crosswalk endpoints
 *
 * @typedef {Object} CrosswalkSerializer
 */
export default Ember.Object.extend({
  /**
   * Normalized data of user competencies
   * @return {Object}
   */
  normalizeCrosswalkCompetencyData: function(id, response) {
    const serializer = this;
    response = Ember.A(response.competencyMatrix);
    const competenciesAndMicro = Ember.A();
    response.forEach(data => {
      let result = Ember.Object.create(data);
      const competencies = Ember.A(result.get('competencies'));
      competencies.forEach(competency => {
        competenciesAndMicro.pushObject(
          serializer.parseCompetencyData(competency)
        );
        if (competency.microCompetencies) {
          const microCompetencies = Ember.A(competency.microCompetencies);
          microCompetencies.forEach(microCompetency => {
            competenciesAndMicro.pushObject(
              serializer.parseMicroCompetencyData(microCompetency)
            );
          });
        }
      });
    });
    return Ember.Object.create({
      id: id,
      data: competenciesAndMicro
    });
  },

  parseCompetencyData(competency) {
    return Ember.Object.create({
      id: competency.frameworkCompetencyCode,
      title: competency.frameworkCompetencyName,
      key: competency.competencyCode,
      isMicro: false
    });
  },

  parseMicroCompetencyData(microCompetency) {
    return Ember.Object.create({
      id: microCompetency.fwMcompCode,
      title: microCompetency.fwMcompName,
      key: microCompetency.txMcompCode,
      isMicro: true
    });
  }
});
