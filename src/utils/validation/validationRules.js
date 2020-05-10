const validationRules = {
  general: {
    presence: {
      allowEmpty: false,
      message: "^Kolom ini tidak boleh kosong",
    },
  },

  email: {
    presence: {
      allowEmpty: false,
      message: "^Email harus diisi",
    },
    email: {
      message: "^Masukkan email yang valid",
    },
  },

  loginPassword: {
    presence: {
      allowEmpty: false,
      message: "^Password harus diisi",
    },
  },

  password: {
    presence: {
      allowEmpty: false,
      message: "^Password harus diisi",
    },
    length: {
      minimum: 6,
      message: "^Password minimal 6 karakter",
    },
  },

  phoneNumber: {
    presence: {
      allowEmpty: false,
      message: "^Nomor HP harus diisi",
    },
    format: {
      pattern: /^[\s\./0-9]*$/,
    },
  },
}

export default validationRules
