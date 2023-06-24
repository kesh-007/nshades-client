import React from 'react';

const TermsAndConditionsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
      <div className="prose">
        <h2>1. Acceptance of Terms</h2>
        <p>
          Welcome to our website. These Terms and Conditions ("Terms") govern your access to and use of our website. By accessing or using our website, you agree to be bound by these Terms. If you do not agree to these Terms, please refrain from using our website.
        </p>

        <h2>2. Eligibility</h2>
        <p>
          Our website is intended for individuals who are at least 18 years old or have the legal capacity to enter into agreements in their jurisdiction. By using our website, you represent and warrant that you meet these eligibility requirements.
        </p>

        <h2>3. User Accounts</h2>
        <p>
          In order to access certain features of our website, you may need to create a user account. You are responsible for maintaining the confidentiality of your account credentials and are liable for all activities that occur under your account. You agree to provide accurate and up-to-date information when creating your user account and to promptly update any changes to your account details.
        </p>

        <h2>4. User Content</h2>
        <p>
          Our website allows users to create and publish profiles and listings. You are solely responsible for the accuracy, legality, and quality of the content you provide. We reserve the right to review, modify, or remove any content that violates these Terms or is deemed inappropriate or unlawful.
        </p>

        <h2>5. Privacy Policy</h2>
        <p>
          We value your privacy and handle your personal information in accordance with our Privacy Policy. By using our website, you consent to the collection, use, and sharing of your information as described in our Privacy Policy.
        </p>

        <h2>6. Intellectual Property</h2>
        <p>
          All content and materials on our website, including but not limited to text, graphics, logos, and images, are protected by intellectual property rights. You may not copy, reproduce, distribute, or modify any content on the website without our prior written consent.
        </p>

        <h2>7. Limitation of Liability</h2>
        <p>
          We strive to provide accurate and reliable information on our website. However, we make no representations or warranties regarding the accuracy, reliability, or completeness of any content on the website. We shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of or in connection with your use of the website.
        </p>

        <h2>8. Modification and Termination</h2>
        <p>
          We reserve the right to modify or terminate the website or any of its features at any time without prior notice. We may also suspend or terminate your access to the website if you violate these Terms or engage in any illegal or harmful activities.
        </p>

        <h2>9. Governing Law and Jurisdiction</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of [Jurisdiction]. Any disputes arising from these Terms or your use of the website shall be subject to the exclusive jurisdiction of the courts in [Jurisdiction].
        </p>
      </div>

      <div className="mt-8 text-sm text-gray-600">
        <p>
          Please note that these Terms and Conditions are subject to change without prior notice. It is your responsibility to review and familiarize yourself with the most recent version available on our website.
        </p>
        <p>
          If you have any questions or concerns about these Terms, please contact us at{' '}
          <a href="mailto:connect.nshades@gmail.com">connect.nshades@gmail.com</a>.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
