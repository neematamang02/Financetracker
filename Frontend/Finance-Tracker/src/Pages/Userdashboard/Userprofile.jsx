import React from "react";
import { expensebg } from "../../assets/images";
import Buttons from "../../components/Buttons";

const Userprofile = () => {
  return (
    <>
      <div className="Userprofile p-5">
        <div className="userprofiletitle">
          <header clas sName="font-bold text-3xl">UserProfile</header>
        </div>
        <div className="userprofileimg flex flex-col justify-center mb-8">
          <img
            src="https://dummycomp.shopespot.com/uploads/partner/254/promo_images/2024/05/dummy-user.png"
            alt="userimage"
            className="rounded-full object-cover h-40 w-40 m-auto"
          />
          <Buttons
            className="bg-green-700 text-white mt-3 w-52 m-auto"
            buttontext={"Upload image here"}
          ></Buttons>
        </div>
        <form
          id="profileForm"
          class="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 space-y-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 m-auto xl:w-3xl"
        >
          <div class="space-y-2">
            <label for="name" class="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-300 bg-white/50 backdrop-blur-sm"
              id="name"
              name="name"
              required
            />
          </div>

          <div class="space-y-2">
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-300 bg-white/50 backdrop-blur-sm"
              id="email"
              name="email"
              required
            />
          </div>

          <div class="pt-6 mt-6 border-t border-gray-200">
            <div class="flex items-center mb-6">
              <div class="p-2.5 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full mr-3 shadow-inner">
                <svg
                  class="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                  />
                </svg>
              </div>
              <h4 class="text-lg font-semibold text-gray-800">
                Change Password
              </h4>
            </div>
            <div class="space-y-6">
              <div class="space-y-2">
                <label
                  for="current_password"
                  class="block text-sm font-medium text-gray-700"
                >
                  Current Password
                </label>
                <input
                  type="password"
                  class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-300 bg-white/50 backdrop-blur-sm"
                  id="current_password"
                  name="current_password"
                />
              </div>

              <div class="space-y-2">
                <label
                  for="new_password"
                  class="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <input
                  type="password"
                  class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-300 bg-white/50 backdrop-blur-sm"
                  id="new_password"
                  name="new_password"
                  minlength="6"
                />
                <p class="text-xs text-gray-500 mt-1">
                  Leave blank to keep current password
                </p>
              </div>

              <div class="space-y-2">
                <label
                  for="confirm_password"
                  class="block text-sm font-medium text-gray-700"
                >
                  Confirm New Password
                </label>
                <input
                  type="password"
                  class="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-blue-300 bg-white/50 backdrop-blur-sm"
                  id="confirm_password"
                  name="confirm_password"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            class="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-600 transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0"
          >
            Save Changes
          </button>
        </form>
      </div>
    </>
  );
};

export default Userprofile;
