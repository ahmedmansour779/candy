import React, { useEffect, useState } from "react";
import Logo from "../../src/assets/images/logo@2x.png";
import Mockup from "../../src/assets/images/Mockup shadow.png";
import MockupMobile from "../../src/assets/images/Mockup shadow Mobile.png";
import Parteners from "../../src/assets/images/Logos.png";

import Feat1 from "../../src/assets/images/feat1.png";
import Feat2 from "../../src/assets/images/feat2.png";
import Feat3 from "../../src/assets/images/feat3.png";

import { Button, Flex, Image, Input, Typography } from "antd";
import { Link } from "react-router-dom";
import { MenuOutlined, XOutlined } from "@ant-design/icons";

import { PricingComponent } from "../pages/client/Pricing";

const { Text } = Typography;

const LandingPage = () => {
  const [dispaly,setDisplay] = useState("right-[-100%]")
  return (
    <>
      <Header display={dispaly} setDisplay={setDisplay}/>
      <ASide display={dispaly}/>
      <div className="px-20 max-lg:px-4 bg-[url('./assets/images/BG.png')]">
        <div className="pt-12"></div>
        <HeroTitle />
      </div>
      <div className="px-20 max-lg:px-4 ">
        <Partners />
        <Features />
      </div>
      <Pricing />
    </>
  );
};

export default LandingPage;

const Header = ({display,setDisplay}:{display:string,setDisplay:React.Dispatch<React.SetStateAction<string>>}) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Flex
      className={`flex justify-between items-center py-4 fixed top-0 left-0 right-0 px-20 max-lg:px-4 transition-all duration-300 z-10 ${
        scrollY > 0 ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <Image src={Logo} preview={false} width={130} alt="Logo" />

      <Flex className="max-lg:hidden">
        <ul className="flex gap-16">
          <a href="#solutions" className="text-[#24336A]">
            <li>Solutions</li>
          </a>
          <a href="#about_us" className="text-[#24336A]">
            <li>About Us</li>
          </a>
          <a href="#pricing" className="text-[#24336A]">
            <li>Pricing</li>
          </a>
        </ul>
      </Flex>
      <Flex className="max-lg:hidden" gap={10}>
        <Button type="primary" className="text-base">
          Contact
        </Button>
        <Link to="/login" className="max-lg:hidden">
          <Button type="primary" className="text-base">
            Login
          </Button>
        </Link>
      </Flex>

      <Button
        type="primary"
        className="hidden group max-lg:flex h-auto px-4 py-4 bg-[#EAEBF0] shadow-none"
        onClick={() => setDisplay(display==="right-[-100%]" ? "right-0" : "right-[-100%]")}
      >
        {
          display === "right-[-100%]" ?
          <MenuOutlined style={{ width: "1rem" }} className="text-[#0154A0] group-hover:text-white" />
          :<XOutlined style={{ width: "1rem" }} className="text-[#0154A0] group-hover:text-white" />
        }
      </Button>
    </Flex>
  );
};

const ASide = ({display}:{display:string})=>{
  return(
    <div className={`${display} duration-500 lg:hidden w-[300px] bg-[#EAEBF0] z-50 h-full fixed top-20 px-6 py-8`}>
      <ul className="flex flex-col items-center justify-center gap-16">
          <a href="#solutions" className="text-[#24336A] hover:text-[#69b1ff] duration-300 text-lg">
            <li>Solutions</li>
          </a>
          <a href="#about_us" className="text-[#24336A] hover:text-[#69b1ff] duration-300 text-lg">
            <li>About Us</li>
          </a>
          <a href="#pricing" className="text-[#24336A] hover:text-[#69b1ff] duration-300 text-lg">
            <li>Pricing</li>
          </a>
      </ul>
      <div className="flex justify-center my-16">
        <Button type="primary" className="text-base">
          Contact
        </Button>
      </div>
      <div className="flex justify-center">
        <Link to="/login" className="">
          <Button type="primary" className="text-base">
            Login
          </Button>
        </Link>
      </div>
    </div>
  )
}

const HeroTitle = () => {
  return (
    <div className="flex mt-20 ">
      <Flex vertical className="text-center w-full max-w-[974px] mx-auto">
        <Flex vertical className="text-center ">
          {" "}
          <Text className="text-8xl text-[#222E57] font-semibold max-md:text-5xl mb-8">
            Effortless Cloud{" "}
            <Text className=" text-8xl  font-semibold text-[#EC008C] max-md:text-5xl">
              Storage
            </Text>{" "}
            for Your Business
          </Text>
          <Text className="text-lg text-[#888888] font-light mb-12">
            Whether you need a quick solution or have specific processes that
            need to be optimised,we are your partner to implement Odoo
            solutions.
          </Text>
        </Flex>

        <Flex className="justify-center mb-8">
          <Flex className="w-full max-w-lg gap-2 max-md:flex-col">
            <Input
              className="!py-3"
              placeholder="enter your email here"
            ></Input>
            <Button type="primary" className="h-auto px-6 py-3">
              Start free trial
            </Button>
          </Flex>
        </Flex>
        <Image
          preview={false}
          className="max-md:hidden"
          src={Mockup}
          alt="Mockup"
        ></Image>
        <Image
          preview={false}
          className="hidden max-md:block"
          src={MockupMobile}
          alt="Mockup"
        ></Image>
      </Flex>
    </div>
  );
};

const Partners = () => {
  return (
    <div id="solutions" className="max-w-full py-10 overflow-x-hidden">
      <Flex justify="center" className="overflow-x-hidden w-max">
        {Array(3).fill(
          <img
            src={Parteners}
            className="h-[30px] !w-[1308px] partener-anim"
            alt="Partners"
          />
        )}
      </Flex>
    </div>
  );
};

const Features = () => {
  return (
    <div id="about_us" className="py-20">
      <Flex vertical className=" text-center w-full max-w-[974px] mx-auto">
        {" "}
        <Text className="text-6xl text-[#222E57] font-semibold max-md:text-4xl mb-8">
          <Text className=" text-6xl  font-semibold text-[#EC008C] max-md:text-4xl">
            Secure. Scalable.
          </Text>{" "}
          Your Cloud Advantage
        </Text>
        <Text className="text-lg text-[#888888] font-light mb-12">
          Secure, scalable, and tailored to empower your endeavors, the cloud
          offers unparalleled advantages in today's digital landscape. With
          robust security measures in place.
        </Text>
      </Flex>
      <Flex vertical className="gap-20 mt-20 max-md:gap-10">
        {features.map((feature, index) => (
          <Feature key={index} feature={feature} reverse={index % 2 === 1} />
        ))}
      </Flex>
    </div>
  );
};

type FeatureProps = {
  img: string;
  title: string;
  desc: {
    title: string;
    info: string;
  }[];
};

const features: FeatureProps[] = [
  {
    img: Feat1,
    title: "Collaborative Workspaces and Version Control",
    desc: [
      {
        title: "Real-Time Collaboration",
        info: "Enable seamless collaboration among team members by allowing them to simultaneously edit documents, share feedback, and work together in real-time.",
      },
      {
        title: "Version History and Rollback",
        info: "Maintain a detailed version history for files, enabling users to track changes, revert to previous versions, and ensure that the latest edits are always accessible.",
      },
    ],
  },
  {
    img: Feat2,
    title: "Scalable Storage Solutions",
    desc: [
      {
        title: "Flexible Storage Plans",
        info: "Choose from a range of storage plans to accommodate your specific needs, allowing you to scale your storage requirements as your business evolves.",
      },
      {
        title: "Pay-as-You-Go Model",
        info: "Benefit from a cost-effective pay-as-you-go pricing model, ensuring you only pay for the storage resources you consume.",
      },
    ],
  },
  {
    img: Feat3,
    title: "Pre-Built Integrations",
    desc: [
      {
        title: "Collaboration Tools",
        info: "Seamless integration with platforms like Slack, Microsoft Teams, or Asana for streamlined teamwork and communication.",
      },
      {
        title: "Project Management Solutions",
        info: "Integrate with project management tools like Jira or Trello, ensuring a unified workflow for project teams.",
      },
    ],
  },
];

const Feature = ({
  feature,
  reverse,
}: {
  feature: FeatureProps;
  reverse: boolean;
}) => {
  const { img, title, desc } = feature;
  return (
    <Flex
      className={`${
        reverse ? "flex-row-reverse" : "flex-row"
      } max-md:flex-col gap-20 max-md:gap-10 w-full items-center max-md:items-start`}
    >
      <div className="flex-1">
        <img className="max-w-full" src={img} alt={title}></img>
      </div>

      <Flex vertical className="flex-1 w-full" gap={8}>
        <Text className="mb-4 text-2xl font-medium text-black">{title}</Text>

        <Flex
          className="p-6 rounded-3xl border-[1px] border-[#EAEBF0]"
          gap={20}
          vertical
        >
          {desc.map((item, index) => (
            <Flex key={index} vertical gap={10} className="pb-6">
              <Text className="text-base font-medium text-black">
                {item.title}
              </Text>
              <Text className="text-base text-[#888888] font-normal">
                {item.info}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};

const Pricing = () => {
  return (
    <div id="pricing" className="px-20 max-lg:px-4  bg-[#FAFAFB] py-20">
      <Flex vertical className=" text-center w-full max-w-[974px] mx-auto">
        {" "}
        <Text className="text-6xl text-[#222E57] font-semibold max-md:text-4xl mb-8">
          Choose your Plan. Try it{" "}
          <Text className=" text-6xl  font-semibold text-[#EC008C] max-md:text-4xl">
            free
          </Text>{" "}
          for 7 days.
        </Text>
        <Text className="text-lg text-[#888888] font-light mb-12">
          Simple, transparent pricing that grows with you. Try any plan free for
          30 days.
        </Text>
      </Flex>

      <PricingComponent showTitle={false} />
    </div>
  );
};
