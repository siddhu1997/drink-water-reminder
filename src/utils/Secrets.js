const config = require("config");

class Secrets {
  isLocal() {
    return ["localhost", "test"].includes(process.env.NODE_ENV);
  }

  /**
   * Get secrets from config file for local and from environment variables for other environments
   * @param {String} key root key containing the secrets
   * @return {Object} secret for the given key.
   */
  get(key) {
    if (this.isLocal()) {
      return config.get(key);
    }
    return process.env[key];
  }
}

module.exports = Secrets;
