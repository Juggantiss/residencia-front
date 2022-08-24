function getProgressFormAspirant(data) {
  let haveAddress =
    data?.usersPermissionsUser?.data?.attributes?.aspirant?.data?.attributes
      ?.address?.data;
  let haveSpecialtyOption =
    data?.usersPermissionsUser?.data?.attributes?.aspirant?.data?.attributes
      ?.specialtyOption?.data;
  let haveDocument =
    data?.usersPermissionsUser?.data?.attributes?.aspirant?.data?.attributes
      ?.document?.data;

  return haveAddress
    ? haveSpecialtyOption
      ? haveDocument
        ? [3, 100]
        : [2, 60]
      : [1, 30]
    : [0, 0];
}

export default getProgressFormAspirant;
