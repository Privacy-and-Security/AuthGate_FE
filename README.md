## AuthGate: Robust Anti-Fraud System for Web Service Registrations and Payment Security

### Introduction

In today's digital era, the spike in online registrations and transactions has been paralleled by an increase in cyber threats, making websites increasingly vulnerable to fraud and attacks. 

Our project is an innovative initiative aimed at **designing and constructing a robust anti-fraud solution to enhance the security of user registrations and payments on our web service**.

Traditional security measures fall short against sophisticated cyber threats. Recognizing this, our project leverages the advanced capabilities of Cloudflare and specialized design strategies, to offer superior protection against such threats.. 

Our aim is to revolutionize web security, setting a new solution in safeguarding user registration and transactions, thereby fostering a reliable and trustworthy digital experience for users.

**Quick view link**：https://authgate.work

## Devleping Procedure

<img src="https://github.com/Privacy-and-Security/AuthGate_FE/assets/82356933/9db43884-a717-494d-91dd-4bf2ed472d6d" width="600">

1. **Environment Setup**:
   
We have crafted a streamlined web environment tailored for user registration and payment processes, incorporating a full suite of comprehensive frontend and backend development. This site serves as a realistic simulation platform, meticulously replicating user interactions like registrations and transactions, thus enabling us to rigorously assess and enhance the security of our web service.

2. **Iterative Development Cycle: Continuous Discovery and Resolution of Security Vulnerabilities**：

Our project embraces **a dynamic and iterative methodology** in web security, acknowledging that the terrain of cyber threats often reveals itself gradually, emerging steadily through ongoing tests and real-time operations. This approach underlines our commitment to adaptively identifying and addressing security challenges as they manifest.

This realization forms the cornerstone of our development philosophy, which is centered on a cycle of continuous discovery and improvement. The Process:

  - **Exploratory Analysis**: Each member of our team actively engages in uncovering potential security vulnerabilities within our system. This proactive exploration is crucial in anticipating and mitigating risks that may not be immediately evident.

  - **Script-Based Validation**: Upon identifying a potential threat, our team employs custom scripts to rigorously test and confirm the existence of these vulnerabilities. This methodical approach ensures that our response is targeted and effective.

  - **Collaborative Issue Tracking**: Once a vulnerability is verified, it is documented as an issue on GitHub. This approach serves as a collaborative space for tracking, discussing, and prioritizing the resolution of identified security concerns.

  - **Responsive Development**: Subsequent to the issue logging, our team swiftly responds with appropriate modifications to both the frontend and backend components of our system. This step is critical in ensuring that vulnerabilities are not just identified but are also promptly and effectively addressed.

  - **Verification and Iteration**: After implementing fixes, we conduct thorough verifications to ensure that each vulnerability is completely resolved. Following this, our cycle recommences, with the team moving on to identify and rectify the next challenge.

This cyclical process of identifying, validating, resolving, and verifying security issues ensures a robust and responsive development environment. It reflects our commitment to an ever-evolving security posture, adapting continuously to new challenges in the cyber landscape, thus maintaining the highest standards of safety and reliability in our web services.

## Our work

Below, we outline the specific security challenges we found during our iteration cycle, and the steps taken to address them.

<img src="https://github.com/Privacy-and-Security/AuthGate_FE/assets/82356933/fab530d8-2b7a-47eb-b689-55b4daf816e5" width=600>


All the scripts mentioned in the above diagram are available in [this repository](https://github.com/Privacy-and-Security/AuthGate_Attack_Tools/tree/main). We also provide detailed descriptions there showing how the scripts work.

We have intentionally preserved the original version of our website and server (https://feweak.authgate.work) for script testing purposes, allowing you to replicate the security vulnerabilities we previously identified. 

You are also invited to visit our latest website version (https://authgate.work) to observe the improvements and see the effects of the resolved vulnerabilities in contrast.

## Get started

### NODE.JS

- Node 16.x || 18.x

### USING NPM

- npm i OR npm i --legacy-peer-deps
- npm run dev
